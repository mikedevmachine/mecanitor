import React from 'react'

import { MediaImage } from '@/components/MediaImage'
import { ContactForm, type ContactFormStrings } from '@/components/sections/ContactForm'
import type { UiStrings } from '@/i18n'
import type { ContactInfo } from '@/payload-types'

import styles from './ContactSection.module.css'

type Props = {
  contactInfo: ContactInfo
  strings: UiStrings
}

/** Dois espaços inquebráveis separam o telefone da última linha da morada. */
const PHONE_SEPARATOR = '\u00A0\u00A0'

/** Indicativo assumido quando o número do CMS não traz nenhum. */
const DEFAULT_DIAL_CODE = '+351'

/**
 * `tel:` a partir do número como está escrito no CMS. Um número já internacional
 * ("+34 …") é respeitado; os restantes assumem-se portugueses.
 */
const telHref = (phone: string) => {
  const trimmed = phone.trim()
  const digits = trimmed.replace(/\D/g, '')
  if (!digits) return null
  return trimmed.startsWith('+') ? `tel:+${digits}` : `tel:${DEFAULT_DIAL_CODE}${digits}`
}

/**
 * Link do mapa: o que estiver guardado no CMS ou, na falta dele, uma pesquisa
 * no Google Maps com a morada escrita.
 */
const mapHref = (mapUrl: string | null | undefined, lines: string[]) => {
  if (mapUrl) return mapUrl
  const query = lines.filter(Boolean).join(', ').replace(/,\s*,/g, ',').trim()
  if (!query) return null
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`
}

/** Espelha o limite validado em `src/app/(frontend)/actions.ts`. */
const MAX_FILES = 5

/** Envolve o conteúdo numa ligação só quando há destino. */
const MaybeLink: React.FC<{
  href: string | null
  className: string
  external?: boolean
  children: React.ReactNode
}> = ({ children, className, external, href }) =>
  href ? (
    <a
      className={className}
      href={href}
      {...(external ? { rel: 'noreferrer', target: '_blank' } : {})}
    >
      {children}
    </a>
  ) : (
    <>{children}</>
  )

/**
 * Secção 6 — Contactos. Fundo `yellow`, mapa à esquerda, bloco de moradas à
 * direita e, por baixo, o título "Fale connosco" com o formulário.
 * O título "CONTACTOS" vive na costura do fim da secção Equipamentos.
 */
export const ContactSection: React.FC<Props> = ({ contactInfo, strings }) => {
  const locations = contactInfo.locations ?? []
  const whatsapp = contactInfo.whatsapp

  /*
   * O wa.me só aceita dígitos — o número do CMS vem formatado ("+351 935 344 841").
   * Sem número, cai-se no `url` guardado no global, como até aqui.
   */
  const whatsappDigits = whatsapp?.number?.replace(/\D/g, '') ?? ''
  const whatsappHref = whatsappDigits ? `https://wa.me/${whatsappDigits}` : (whatsapp?.url ?? '')

  /*
   * O formulário é um Client Component e uma fronteira Server → Client não
   * serializa funções, por isso `formFilesChosen` atravessa já resolvido para
   * cada contagem possível (0…MAX_FILES). Ver `ContactFormStrings`.
   */
  const formStrings: ContactFormStrings = {
    formSending: strings.formSending,
    formSuccess: strings.formSuccess,
    formFileHint: strings.formFileHint,
    formErrors: strings.formErrors,
    formFilesChosen: Array.from({ length: MAX_FILES + 1 }, (_, count) =>
      strings.formFilesChosen(count),
    ),
  }

  return (
    <section className={styles.section}>
      <div className={styles.top}>
        {contactInfo.mapImage ? (
          <div className={styles.map}>
            <MediaImage
              className={styles.mapImage}
              fill
              media={contactInfo.mapImage}
              sizes="(min-width: 1200px) 709px, (min-width: 1024px) 62vw, 100vw"
            />
          </div>
        ) : null}

        <div className={styles.details}>
          {locations.map((location, locationIndex) => {
            const addressLines = location.addressLines ?? []
            const lines = addressLines.map((addressLine) => addressLine.line)
            const map = mapHref(location.mapUrl, lines)
            const tel = location.phone ? telHref(location.phone) : null

            return (
              <p key={location.id ?? locationIndex}>
                <strong className={styles.locationName}>{location.name}</strong>
                <br />
                {/* A morada inteira é uma só ligação para o mapa. */}
                <MaybeLink className={styles.addressLink} external href={map}>
                  {lines.map((line, lineIndex) => (
                    <React.Fragment key={addressLines[lineIndex].id ?? lineIndex}>
                      {lineIndex > 0 ? <br /> : null}
                      {line}
                    </React.Fragment>
                  ))}
                </MaybeLink>
                {location.phone ? (
                  <>
                    {PHONE_SEPARATOR}
                    {location.phoneLabel ? `${location.phoneLabel} ` : null}
                    <MaybeLink className={styles.phoneLink} href={tel}>
                      {location.phone}
                    </MaybeLink>
                  </>
                ) : null}
              </p>
            )
          })}

          <p>
            {contactInfo.generalEmailLabel ? (
              <>
                <strong className={styles.emailLabel}>{contactInfo.generalEmailLabel}</strong>
                {' • '}
              </>
            ) : null}
            <a className={styles.emailLink} href={`mailto:${contactInfo.generalEmail}`}>
              {contactInfo.generalEmail}
            </a>
          </p>

          {whatsapp?.label && whatsappHref ? (
            <div className={styles.whatsapp}>
              {whatsapp.prefix ? (
                <span className={styles.whatsappPrefix}>{whatsapp.prefix}</span>
              ) : null}
              <a
                aria-label={
                  whatsapp.number
                    ? `${strings.whatsappAria} — ${whatsapp.number}`
                    : strings.whatsappAria
                }
                className={styles.whatsappButton}
                href={whatsappHref}
                rel="noreferrer"
                target="_blank"
              >
                {whatsapp.label}
              </a>
            </div>
          ) : null}
        </div>
      </div>

      {/* Título interno do design, distinto da costura: risco de 2px a sangrar à direita. */}
      <div className={styles.formHeading}>
        <div className={styles.formHeadingInner}>
          <h2 className={styles.formHeadingLabel}>{contactInfo.formHeading}</h2>
        </div>
        <div aria-hidden="true" className={styles.formHeadingRule} />
      </div>

      <div className={styles.formArea}>
        <ContactForm labels={contactInfo.formLabels ?? {}} strings={formStrings} />
      </div>
    </section>
  )
}

export default ContactSection

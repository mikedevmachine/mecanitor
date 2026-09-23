import Link from 'next/link'
import React from 'react'

import { MediaImage } from '@/components/MediaImage'
import type { Locale } from '@/i18n'
import type { Service } from '@/payload-types'

import styles from './ServiceCard.module.css'

type Props = {
  /** Idioma activo — prefixa o `href` do card. */
  locale: Locale
  service: Service
}

/**
 * Card de serviço: barra de título preta de 88px sobre uma imagem de 380 × 245
 * com vinheta radial. O conjunto liga para /{locale}/services/{slug}.
 */
export const ServiceCard: React.FC<Props> = ({ locale, service }) => {
  const image = typeof service.image === 'object' && service.image !== null ? service.image : null
  const fullTitle = service.titleSecondLine
    ? `${service.title} ${service.titleSecondLine}`
    : service.title

  return (
    <Link className={styles.card} href={`/${locale}/services/${service.slug}`}>
      <div className={styles.bar}>
        <span className={styles.title}>
          {service.title}
          {service.titleSecondLine ? (
            <>
              <br />
              {service.titleSecondLine}
            </>
          ) : null}
        </span>
      </div>
      <div className={styles.media}>
        <MediaImage
          alt={image?.alt || fullTitle}
          fill
          media={service.image}
          sizes="(min-width: 1024px) 380px, (min-width: 768px) 50vw, 100vw"
        />
        {/* Vinheta radial do design — escurece os cantos da fotografia. */}
        <div aria-hidden="true" className={styles.vignette} />
      </div>
    </Link>
  )
}

export default ServiceCard

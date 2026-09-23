import React from 'react'

import { SectionSeam } from '@/components/SectionSeam'
import { ServiceCard } from '@/components/sections/ServiceCard'
import type { Locale } from '@/i18n'
import type { Service } from '@/payload-types'

import styles from './ServicesSection.module.css'

type Props = {
  /** Idioma activo — vai para os `href` dos cards. */
  locale: Locale
  /** Título da secção seguinte — no Figma assenta na costura desta. */
  seamLabel: string
  services: Service[]
}

/**
 * Secção "Serviços": fundo `ink`, o degradé preto que continua o esbatimento do
 * hero, a cunha branca no canto inferior esquerdo e a grelha de cards. Na
 * costura em baixo fica o título da secção seguinte, pousado sobre a cunha branca.
 */
export const ServicesSection: React.FC<Props> = ({ locale, seamLabel, services }) => (
  <section className={styles.services}>
    {/* Camada decorativa recortada — a costura tem de poder transbordar a secção. */}
    <div aria-hidden="true" className={styles.decor}>
      {/* Continua o fade do hero: 159px de preto a esbater-se para o fundo da secção. */}
      <div className={styles.fade} />
      {/* Cunha branca decorativa, ancorada ao canto inferior esquerdo (761 × 552 no design). */}
      {/* eslint-disable-next-line @next/next/no-img-element -- SVG decorativo, fora do optimizador */}
      <img alt="" className={styles.wedge} src="/figma/wedge-white.svg" />
    </div>

    <div className={styles.content}>
      {services.length > 0 ? (
        <div className={styles.grid}>
          {services.map((service) => (
            <ServiceCard key={service.id} locale={locale} service={service} />
          ))}
        </div>
      ) : null}
    </div>

    <SectionSeam id="about" label={seamLabel} tone="ink" />
  </section>
)

export default ServicesSection

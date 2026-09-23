import React from 'react'

import { MediaImage } from '@/components/MediaImage'
import { SectionSeam } from '@/components/SectionSeam'
import type { HomePage } from '@/payload-types'

import styles from './Hero.module.css'

type Props = {
  heroImage: HomePage['heroImage']
  tagline: HomePage['tagline']
  /** Título da secção seguinte — no Figma assenta na costura do hero. */
  servicesLabel: string
}

/** Fallback (pt-PT) usado apenas enquanto o global `home-page` não tiver assinatura. */
const FALLBACK_TAGLINE: NonNullable<HomePage['tagline']> = [
  { text: 'Inspirados pelo ' },
  { text: 'Design', emphasis: true },
  { text: ', fabricamos ' },
  { text: 'funcionalidade', emphasis: true },
]

/**
 * Encosta ao topo do documento: o cabeçalho fixo flutua por cima da fotografia,
 * por isso não leva qualquer padding superior. Na costura em baixo ficam, lado a
 * lado, o título "SERVIÇOS" e a assinatura, sobre o risco que sangra à direita.
 */
export const Hero: React.FC<Props> = ({ heroImage, servicesLabel, tagline }) => {
  const segments = tagline && tagline.length > 0 ? tagline : FALLBACK_TAGLINE

  return (
    <section className={styles.hero}>
      <div className={styles.photo}>
        {/* Fotografia do CMS; sem ela usa-se o recorte estático exportado do Figma. */}
        <MediaImage
          alt={heroImage && typeof heroImage === 'object' ? undefined : 'Escadaria em metal'}
          fallbackSrc="/figma/hero.jpg"
          fill
          media={heroImage}
          priority
          sizes="100vw"
        />
      </div>

      <div aria-hidden="true" className={styles.fade} />

      {/* eslint-disable-next-line @next/next/no-img-element -- SVG decorativo, fora do optimizador */}
      <img
        alt=""
        aria-hidden="true"
        className={styles.wedge}
        height={431}
        src="/figma/hero-wedge.svg"
        width={527}
      />

      <SectionSeam id="services" label={servicesLabel} tone="ash">
        <p className={styles.tagline}>
          {segments.map((segment, index) => (
            <span
              className={segment.emphasis ? styles.emphasis : undefined}
              key={segment.id ?? index}
            >
              {segment.text}
            </span>
          ))}
        </p>
      </SectionSeam>
    </section>
  )
}

export default Hero

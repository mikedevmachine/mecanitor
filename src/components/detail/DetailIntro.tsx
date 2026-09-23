import Link from 'next/link'
import React from 'react'

import styles from './DetailIntro.module.css'

type NavTarget = {
  href: string
  /** Rótulo acessível completo, ex.: "Serviço anterior: Corte Laser de Chapa". */
  label: string
}

type Props = {
  /** Título da página. Nos equipamentos traz dois pesos (categoria + modelo). */
  title: React.ReactNode
  intro?: React.ReactNode
  previous: NavTarget
  next: NavTarget
  navLabel: string
}

/**
 * Topo partilhado pelas páginas de serviço e de equipamento — frame 217:978 do
 * Figma: barra do título sobre o degradé escuro, texto de introdução e as setas
 * de navegação entre irmãos.
 */
export const DetailIntro: React.FC<Props> = ({ intro, navLabel, next, previous, title }) => (
  <div className={styles.intro}>
    <div className={styles.inner}>
      <div className={styles.titleBar}>
        <h1 className={styles.title}>{title}</h1>
      </div>

      {/* eslint-disable-next-line @next/next/no-img-element -- SVG decorativo, fora do optimizador */}
      <img alt="" aria-hidden="true" className={styles.rule} src="/figma/service-rule.svg" />

      {intro ? <div className={styles.lead}>{intro}</div> : null}

      <nav aria-label={navLabel} className={styles.nav}>
        <Link aria-label={previous.label} className={styles.arrow} href={previous.href} />
        <Link
          aria-label={next.label}
          className={`${styles.arrow} ${styles.next}`}
          href={next.href}
        />
      </nav>
    </div>
  </div>
)

export default DetailIntro

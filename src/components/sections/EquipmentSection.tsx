import React from 'react'

import { SectionSeam } from '@/components/SectionSeam'
import { EquipmentCard } from '@/components/sections/EquipmentCard'
import type { Locale } from '@/i18n'
import type { Equipment } from '@/payload-types'

import styles from './EquipmentSection.module.css'

type Props = {
  equipment: Equipment[]
  locale: Locale
  /** Título da secção seguinte — no Figma assenta na costura dos Equipamentos. */
  seamLabel: string
}

/**
 * Secção "Equipamentos": fundo `ink`, cunha amarela ancorada ao canto inferior
 * esquerdo e cartões de 366px em linhas de três, centradas (3 + 2 como no Figma).
 * Na costura em baixo fica o título "CONTACTOS", por cima da cunha amarela.
 */
export const EquipmentSection: React.FC<Props> = ({ equipment, locale, seamLabel }) => (
  <section className={styles.section}>
    {/* Camada recortada: a secção em si não pode cortar a costura. */}
    <div className={styles.decor}>
      {/* Triângulo decorativo — mantém a proporção natural de 550.76 × 399.5. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        alt=""
        aria-hidden="true"
        className={styles.wedge}
        height={400}
        src="/figma/wedge-yellow.svg"
        width={551}
      />
    </div>

    <div className={styles.content}>
      <div className={styles.container}>
        <ul className={styles.grid}>
          {equipment.map((item) => (
            <li className={styles.item} key={item.id}>
              <EquipmentCard item={item} locale={locale} />
            </li>
          ))}
        </ul>
      </div>
    </div>

    <SectionSeam id="contact" label={seamLabel} tone="ink" />
  </section>
)

export default EquipmentSection

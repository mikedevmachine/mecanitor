import React from 'react'

import styles from './SectionSeam.module.css'

type Tone = 'ash' | 'ink' | 'white'

type Props = {
  /** Âncora da secção que o título anuncia, ex.: `services`. */
  id: string
  label: string
  tone: Tone
  /** Conteúdo opcional à direita do título — no hero, a assinatura. */
  children?: React.ReactNode
}

/**
 * Título de secção colocado na costura entre duas secções: renderiza-se no fim
 * da secção anterior (que tem de ser `position: relative` e **não** pode cortar
 * o conteúdo) e anuncia a secção seguinte.
 */
export const SectionSeam: React.FC<Props> = ({ children, id, label, tone }) => (
  <div className={`${styles.seam} ${styles[tone]}`}>
    <div className={styles.inner}>
      <h2 className={styles.label} id={id}>
        {label}
      </h2>
      {children ? <div className={styles.aside}>{children}</div> : null}
    </div>
    <div aria-hidden="true" className={styles.rule} />
  </div>
)

export default SectionSeam

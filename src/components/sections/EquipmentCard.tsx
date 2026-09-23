import Link from 'next/link'
import React from 'react'

import { MediaImage } from '@/components/MediaImage'
import type { Locale } from '@/i18n'
import type { Equipment } from '@/payload-types'

import styles from './EquipmentCard.module.css'

type Props = {
  item: Equipment
  locale: Locale
}

/** Fallback pt-PT usado apenas quando o CMS não preenche `linkLabel`. */
const DEFAULT_LINK_LABEL = 'VER MAIS'

/**
 * Cartão de equipamento: cabeçalho cinzento com categoria/modelo, imagem em fundo
 * branco e, no rodapé, o risco dourado com a ligação "VER MAIS".
 */
export const EquipmentCard: React.FC<Props> = ({ item, locale }) => (
  <Link className={styles.card} href={`/${locale}/equipment/${item.slug}`}>
    <div className={styles.header}>
      <span className={styles.category}>{item.category}</span>
      <span className={styles.model}>{item.model}</span>
    </div>

    <div className={styles.body}>
      <div className={styles.media}>
        <MediaImage
          className={styles.image}
          media={item.image}
          sizes="(max-width: 767px) 100vw, 340px"
        />
      </div>

      <div className={styles.more}>
        <span aria-hidden="true" className={styles.rule} />
        <span className={styles.label}>{item.linkLabel ?? DEFAULT_LINK_LABEL}</span>
      </div>
    </div>
  </Link>
)

export default EquipmentCard

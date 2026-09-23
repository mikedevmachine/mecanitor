import React from 'react'

import { MediaImage } from '@/components/MediaImage'
import type { Equipment } from '@/payload-types'

import styles from './EquipmentGallery.module.css'

type Props = {
  gallery: Equipment['gallery']
}

/**
 * Fotografias do equipamento, a toda a largura e empilhadas. Sem galeria, a
 * secção não se renderiza de todo.
 */
export const EquipmentGallery: React.FC<Props> = ({ gallery }) => {
  const items = (gallery ?? []).filter((item) => typeof item === 'object' && item !== null)

  if (items.length === 0) return null

  return (
    <div className={styles.wrapper}>
      <div className={styles.list}>
        {items.map((item) => (
          <figure className={styles.item} key={item.id}>
            <MediaImage fill media={item} sizes="(min-width: 1262px) 1214px, 100vw" />
          </figure>
        ))}
      </div>
    </div>
  )
}

export default EquipmentGallery

import React from 'react'

import { GalleryLightbox } from '@/components/services/GalleryLightbox'
import type { GalleryItem } from '@/components/services/GalleryLightbox'
import type { UiStrings } from '@/i18n'
import type { Service } from '@/payload-types'

import styles from './ServiceGallery.module.css'

type Props = {
  gallery: Service['gallery']
  strings: UiStrings
}

/**
 * Galeria de trabalhos do serviço. Converte os documentos do Payload em dados
 * simples para a fronteira de cliente, que é quem trata da janela de detalhe.
 */
export const ServiceGallery: React.FC<Props> = ({ gallery, strings }) => {
  const items: GalleryItem[] = (gallery ?? []).flatMap((row, index) => {
    const media = typeof row.image === 'object' && row.image !== null ? row.image : null
    if (!media?.url) return []

    return [
      {
        id: row.id ?? `${index}`,
        url: media.url,
        alt: media.alt ?? '',
        width: media.width ?? undefined,
        height: media.height ?? undefined,
        client: row.client ?? undefined,
        location: row.location ?? undefined,
        description: row.description ?? undefined,
      },
    ]
  })

  if (items.length === 0) return null

  return (
    <div className={styles.wrapper}>
      <GalleryLightbox
        items={items}
        labels={{
          open: strings.galleryOpen,
          close: strings.galleryClose,
          previous: strings.galleryPrevious,
          next: strings.galleryNext,
          dialog: strings.galleryDialog,
          client: strings.galleryClient,
          location: strings.galleryLocation,
          description: strings.galleryDescription,
        }}
      />
    </div>
  )
}

export default ServiceGallery

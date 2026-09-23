import Image from 'next/image'
import React from 'react'

import type { Media } from '@/payload-types'

type Props = {
  media?: number | Media | null
  /** Usado quando o campo do CMS está vazio — ex.: '/figma/hero.jpg' */
  fallbackSrc?: string
  alt?: string
  className?: string
  sizes?: string
  fill?: boolean
  width?: number
  height?: number
  priority?: boolean
}

/**
 * Renderiza um documento `media` do Payload através do `next/image`.
 * Aceita a relação por popular (número) e nesse caso não renderiza nada,
 * a não ser que exista `fallbackSrc`.
 */
export const MediaImage: React.FC<Props> = ({
  media,
  fallbackSrc,
  alt,
  className,
  sizes,
  fill,
  width,
  height,
  priority,
}) => {
  const doc = typeof media === 'object' && media !== null ? media : null
  const src = doc?.url ?? fallbackSrc

  if (!src) return null

  const resolvedAlt = alt ?? doc?.alt ?? ''

  if (fill) {
    return (
      <Image
        alt={resolvedAlt}
        className={className}
        fill
        priority={priority}
        sizes={sizes ?? '100vw'}
        src={src}
      />
    )
  }

  return (
    <Image
      alt={resolvedAlt}
      className={className}
      height={height ?? doc?.height ?? 0}
      priority={priority}
      sizes={sizes}
      src={src}
      width={width ?? doc?.width ?? 0}
    />
  )
}

export default MediaImage

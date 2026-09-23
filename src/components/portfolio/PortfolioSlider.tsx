'use client'

import Image from 'next/image'
import Link from 'next/link'
import React, { useCallback, useEffect, useRef, useState } from 'react'

import styles from './PortfolioSlider.module.css'

export type SliderPhoto = {
  id: string
  url: string
  alt: string
  width?: number
  height?: number
}

type Props = {
  photos: SliderPhoto[]
  /** Página do serviço para onde cada fotografia aponta. */
  href: string
  labels: {
    nav: string
    previous: string
    next: string
    /** Modelo com `{n}` no lugar do número da página. */
    goTo: string
  }
}

/**
 * Carrossel de uma faixa do portfólio — no desenho são três fotografias de
 * 402×332 com 4px de intervalo, setas em painéis translúcidos de 72px e uma
 * paginação de bolinhas ao fundo (frame 10:1850).
 *
 * O deslocamento é feito com `scroll-snap` em vez de `transform`: assim o
 * número de fotografias por página vem do CSS e muda com a largura do ecrã,
 * sem ter de a medir aqui.
 */
export const PortfolioSlider: React.FC<Props> = ({ photos, href, labels }) => {
  const trackRef = useRef<HTMLUListElement>(null)
  const [pages, setPages] = useState(1)
  const [page, setPage] = useState(0)

  /*
   * Quantas fotografias cabem de uma vez e qual o salto de cada página. O salto
   * é a largura das fotografias visíveis mais os intervalos entre elas — não a
   * do contentor, que fica 4px mais curta por não ter o intervalo do fim.
   */
  const metrics = (track: HTMLUListElement) => {
    const first = track.firstElementChild as HTMLElement | null
    if (!first) return { step: track.clientWidth, pages: 1 }
    const gap = Number.parseFloat(getComputedStyle(track).columnGap) || 0
    const slide = first.getBoundingClientRect().width + gap
    const perView = Math.max(1, Math.round((track.clientWidth + gap) / slide))
    return { step: perView * slide, pages: Math.ceil(track.children.length / perView) }
  }

  const sync = useCallback(() => {
    const track = trackRef.current
    if (!track || track.clientWidth === 0) return
    const { step, pages: count } = metrics(track)
    setPages(Math.max(1, count))
    setPage(Math.round(track.scrollLeft / step))
  }, [])

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    sync()
    const observer = new ResizeObserver(sync)
    observer.observe(track)
    return () => observer.disconnect()
  }, [sync])

  const scrollToPage = (next: number) => {
    const track = trackRef.current
    if (!track) return
    const clamped = Math.min(Math.max(next, 0), pages - 1)
    track.scrollTo({ left: clamped * metrics(track).step, behavior: 'smooth' })
  }

  if (photos.length === 0) return null

  return (
    <div className={styles.slider}>
      <ul className={styles.track} onScroll={sync} ref={trackRef}>
        {photos.map((photo) => (
          <li className={styles.slide} key={photo.id}>
            <Link className={styles.link} href={href} tabIndex={-1}>
              <Image
                alt={photo.alt}
                className={styles.photo}
                height={photo.height ?? 332}
                sizes="(width >= 1280px) 403px, (width >= 768px) 50vw, 100vw"
                src={photo.url}
                width={photo.width ?? 403}
              />
            </Link>
          </li>
        ))}
      </ul>

      {pages > 1 && (
        <>
          <button
            aria-label={labels.previous}
            className={`${styles.arrow} ${styles.previous}`}
            disabled={page === 0}
            onClick={() => scrollToPage(page - 1)}
            type="button"
          />
          <button
            aria-label={labels.next}
            className={`${styles.arrow} ${styles.next}`}
            disabled={page >= pages - 1}
            onClick={() => scrollToPage(page + 1)}
            type="button"
          />

          <nav aria-label={labels.nav} className={styles.dots}>
            {Array.from({ length: pages }, (_, index) => (
              <button
                aria-current={index === page ? 'true' : undefined}
                aria-label={labels.goTo.replace('{n}', String(index + 1))}
                className={styles.dot}
                key={index}
                onClick={() => scrollToPage(index)}
                type="button"
              />
            ))}
          </nav>
        </>
      )}
    </div>
  )
}

export default PortfolioSlider

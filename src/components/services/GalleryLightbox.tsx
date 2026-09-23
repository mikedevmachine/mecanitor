'use client'

import Image from 'next/image'
import React from 'react'

import styles from './GalleryLightbox.module.css'

export type GalleryItem = {
  id: string
  url: string
  alt: string
  width?: number
  height?: number
  client?: string
  location?: string
  description?: string
}

export type GalleryLabels = {
  open: string
  close: string
  previous: string
  next: string
  dialog: string
  client: string
  location: string
  description: string
}

type Props = {
  items: GalleryItem[]
  labels: GalleryLabels
}

/**
 * Grelha de trabalhos: cada imagem abre numa janela com a respectiva ficha.
 *
 * Usa o `<dialog>` nativo com `showModal()`, que já trata do aprisionamento do
 * foco, da tecla Escape e de tornar inerte o resto da página. As setas percorrem
 * a galeria em ciclo, tal como as da página de serviço.
 */
export const GalleryLightbox: React.FC<Props> = ({ items, labels }) => {
  const dialogRef = React.useRef<HTMLDialogElement>(null)
  const [openIndex, setOpenIndex] = React.useState<number | null>(null)

  const open = (index: number) => {
    setOpenIndex(index)
    dialogRef.current?.showModal()
  }

  const close = () => {
    dialogRef.current?.close()
  }

  const step = React.useCallback(
    (delta: number) => {
      setOpenIndex((current) => {
        if (current === null) return current
        return (current + delta + items.length) % items.length
      })
    },
    [items.length],
  )

  // Setas do teclado, enquanto a janela estiver aberta.
  React.useEffect(() => {
    if (openIndex === null) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') step(-1)
      if (event.key === 'ArrowRight') step(1)
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [openIndex, step])

  const current = openIndex === null ? null : items[openIndex]

  return (
    <>
      <div className={styles.grid}>
        {items.map((item, index) => (
          <button
            aria-label={`${labels.open}: ${item.alt}`}
            className={styles.cell}
            key={item.id}
            onClick={() => open(index)}
            type="button"
          >
            <Image
              alt={item.alt}
              fill
              sizes="(min-width: 1024px) 394px, (min-width: 640px) 50vw, 100vw"
              src={item.url}
            />
          </button>
        ))}
      </div>

      <dialog
        aria-label={labels.dialog}
        className={styles.dialog}
        /* Clique fora do conteúdo (no próprio `dialog`) fecha a janela. */
        onClick={(event) => {
          if (event.target === dialogRef.current) close()
        }}
        onClose={() => setOpenIndex(null)}
        ref={dialogRef}
      >
        {current ? (
          <>
            <div className={styles.stage}>
              <Image
                alt={current.alt}
                height={current.height ?? 810}
                priority
                sizes="(min-width: 957px) 937px, 100vw"
                src={current.url}
                width={current.width ?? 937}
              />

              <button
                aria-label={labels.close}
                className={styles.close}
                onClick={close}
                type="button"
              />

              {items.length > 1 ? (
                <>
                  <button
                    aria-label={labels.previous}
                    className={`${styles.arrow} ${styles.previous}`}
                    onClick={() => step(-1)}
                    type="button"
                  />

                  <button
                    aria-label={labels.next}
                    className={`${styles.arrow} ${styles.next}`}
                    onClick={() => step(1)}
                    type="button"
                  />
                </>
              ) : null}
            </div>

            {/* As três linhas aparecem sempre; por preencher, o valor fica vazio. */}
            <dl className={styles.facts}>
              <dt className={`${styles.label} ${styles.first}`}>{labels.client}</dt>
              <dd className={`${styles.value} ${styles.first}`}>{current.client}</dd>

              <dt className={styles.label}>{labels.location}</dt>
              <dd className={styles.value}>{current.location}</dd>

              <dt className={`${styles.label} ${styles.descriptionLabel}`}>{labels.description}</dt>
              <dd className={`${styles.value} ${styles.description}`}>{current.description}</dd>
            </dl>
          </>
        ) : null}
      </dialog>
    </>
  )
}

export default GalleryLightbox

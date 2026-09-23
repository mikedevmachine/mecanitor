import { RichText } from '@payloadcms/richtext-lexical/react'
import React from 'react'

import { MediaImage } from '@/components/MediaImage'
import { SectionSeam } from '@/components/SectionSeam'
import type { HomePage } from '@/payload-types'

import styles from './AboutSection.module.css'

type AboutBlock = NonNullable<HomePage['aboutBlocks']>[number]

type ImagePosition = AboutBlock['imagePosition']

type ImageAspect = AboutBlock['imageAspect']

type Props = {
  blocks: HomePage['aboutBlocks']
  /** Título da secção seguinte — no Figma assenta na costura desta. */
  seamLabel: string
}

/**
 * Larguras da coluna de texto no design de 1440px: 399px quando a imagem fica à
 * direita (bloco 1) e 710px quando fica à esquerda (blocos 2 e 3). A linha tem
 * no máximo 1172px com 48px de intervalo entre colunas.
 */
const textColumnClass: Record<ImagePosition, string> = {
  left: styles.textWide,
  right: styles.textNarrow,
}

/** Largura resultante da imagem = 1172px − coluna de texto − 48px de intervalo. */
const imageSizes: Record<ImagePosition, string> = {
  left: '(min-width: 1024px) 414px, calc(100vw - 48px)',
  right: '(min-width: 1024px) 725px, calc(100vw - 48px)',
}

/**
 * Recortes do Figma: 709 × 559 no bloco 1, 400 × 442 no bloco 2 e 398 × 539 no
 * bloco 3. O editor escolhe o formato; "auto" mantém as proporções do ficheiro.
 */
const ratioClass: Partial<Record<ImageAspect, string>> = {
  '5/4': styles.ratio54,
  '1/1': styles.ratio11,
  '3/4': styles.ratio34,
}

/**
 * Coluna da imagem. A borda branca de 2px vem do terceiro bloco no Figma; sobre o
 * fundo branco da secção é imperceptível nos restantes, por isso é aplicada a todos.
 */
const BlockImage: React.FC<{ block: AboutBlock }> = ({ block }) => {
  const ratio = ratioClass[block.imageAspect]

  if (!ratio) {
    return (
      <div className={styles.media}>
        <MediaImage
          className={styles.autoImage}
          media={block.image}
          sizes={imageSizes[block.imagePosition]}
        />
      </div>
    )
  }

  return (
    <div className={styles.media}>
      <div className={`${styles.frame} ${ratio}`}>
        <MediaImage
          className={styles.cover}
          fill
          media={block.image}
          sizes={imageSizes[block.imagePosition]}
        />
      </div>
    </div>
  )
}

/**
 * Secção "Quem Somos": blocos alternados de texto e imagem sobre fundo branco,
 * com o triângulo escuro ancorado ao canto inferior esquerdo. Na costura em
 * baixo fica o título "EQUIPAMENTOS", a branco por cima desse triângulo.
 */
export const AboutSection: React.FC<Props> = ({ blocks, seamLabel }) => (
  <section className={styles.section}>
    {/* Triângulo decorativo, sempre atrás do conteúdo e recortado na sua própria camada. */}
    <div aria-hidden="true" className={styles.wedgeLayer}>
      {/* eslint-disable-next-line @next/next/no-img-element -- SVG decorativo, não passa pelo optimizador */}
      <img alt="" aria-hidden="true" className={styles.wedge} src="/figma/wedge-dark.svg" />
    </div>

    <div className={styles.content}>
      {blocks && blocks.length > 0 ? (
        <div className={styles.blocks}>
          {blocks.map((block, index) => {
            const imageFirst = block.imagePosition === 'left'

            return (
              <article className={styles.block} key={block.id ?? index}>
                {imageFirst ? <BlockImage block={block} /> : null}

                <div className={`${styles.text} ${textColumnClass[block.imagePosition]}`}>
                  <h3 className={styles.title}>{block.title}</h3>

                  {block.showRule ? (
                    // eslint-disable-next-line @next/next/no-img-element -- SVG decorativo
                    <img
                      alt=""
                      aria-hidden="true"
                      className={styles.rule}
                      src="/figma/heading-rule.svg"
                    />
                  ) : null}

                  <div className={styles.body}>
                    <RichText data={block.body} />
                  </div>
                </div>

                {imageFirst ? null : <BlockImage block={block} />}
              </article>
            )
          })}
        </div>
      ) : null}
    </div>

    <SectionSeam id="equipment" label={seamLabel} tone="white" />
  </section>
)

export default AboutSection

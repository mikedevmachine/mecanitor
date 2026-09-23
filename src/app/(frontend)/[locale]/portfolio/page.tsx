import type { Metadata } from 'next'
import config from '@payload-config'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import React from 'react'

import { PortfolioSlider } from '@/components/portfolio/PortfolioSlider'
import type { SliderPhoto } from '@/components/portfolio/PortfolioSlider'
import { isLocale, locales, ui } from '@/i18n'
import type { Service } from '@/payload-types'

import styles from './page.module.css'

export const dynamic = 'force-dynamic'

type Params = { locale: string }

/*
 * Quantas fotografias cada faixa mostra. O desenho tem duas páginas de três; os
 * serviços maiores trazem quase cem fotografias, o que daria trinta e três
 * bolinhas de paginação — a página de cada serviço é que mostra tudo.
 */
const PHOTOS_PER_ROW = 12

const fullTitle = (service: Service) =>
  service.titleSecondLine ? `${service.title} ${service.titleSecondLine}` : service.title

const loadServices = async (locale: 'pt' | 'en') => {
  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: 'services',
    limit: 100,
    sort: 'order',
    depth: 2,
    locale,
  })
  return docs
}

export const generateMetadata = async ({
  params,
}: {
  params: Promise<Params>
}): Promise<Metadata> => {
  const { locale } = await params
  if (!isLocale(locale)) return {}

  return {
    title: `${ui[locale].portfolioTitle} — Mecanitor`,
    alternates: {
      canonical: `/${locale}/portfolio`,
      languages: Object.fromEntries(locales.map((code) => [code, `/${code}/portfolio`])),
    },
  }
}

export default async function PortfolioPage({ params }: { params: Promise<Params> }) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()

  const strings = ui[locale]
  const services = await loadServices(locale)

  const rows = services.flatMap((service) => {
    const photos: SliderPhoto[] = (service.gallery ?? []).flatMap((item, index) => {
      const media = typeof item.image === 'object' && item.image !== null ? item.image : null
      if (!media?.url) return []

      return [
        {
          id: item.id ?? `${service.slug}-${index}`,
          url: media.url,
          alt: media.alt ?? '',
          width: media.width ?? undefined,
          height: media.height ?? undefined,
        },
      ]
    })

    if (photos.length === 0) return []
    return [{ service, photos: photos.slice(0, PHOTOS_PER_ROW) }]
  })

  return (
    <article className={styles.page}>
      <h1 className={styles.title}>{strings.portfolioTitle}</h1>

      {rows.length === 0 ? (
        <p className={styles.empty}>{strings.portfolioEmpty}</p>
      ) : (
        <div className={styles.rows}>
          {rows.map(({ service, photos }) => (
            <section className={styles.row} key={service.slug}>
              <h2 className={styles.label}>{fullTitle(service)}</h2>
              <PortfolioSlider
                href={`/${locale}/services/${service.slug}`}
                labels={{
                  nav: strings.sliderNav(fullTitle(service)),
                  previous: strings.sliderPrevious,
                  next: strings.sliderNext,
                  goTo: strings.sliderGoTo,
                }}
                photos={photos}
              />
            </section>
          ))}
        </div>
      )}
    </article>
  )
}

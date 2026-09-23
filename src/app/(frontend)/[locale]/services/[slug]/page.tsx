import type { Metadata } from 'next'
import config from '@payload-config'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import React from 'react'

import { ServiceGallery } from '@/components/services/ServiceGallery'
import { DetailIntro } from '@/components/detail/DetailIntro'
import { isLocale, locales, ui } from '@/i18n'
import type { Service } from '@/payload-types'

import styles from './page.module.css'

export const dynamic = 'force-dynamic'

type Params = { locale: string; slug: string }

const fullTitle = (service: Service) =>
  service.titleSecondLine ? `${service.title} ${service.titleSecondLine}` : service.title

/** Todos os serviços por ordem — serve o documento e os vizinhos numa só query. */
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
  const { locale, slug } = await params
  if (!isLocale(locale)) return {}

  const service = (await loadServices(locale)).find((doc) => doc.slug === slug)
  if (!service) return {}

  return {
    title: `${fullTitle(service)} — Mecanitor`,
    description: service.intro ?? undefined,
    alternates: {
      canonical: `/${locale}/services/${slug}`,
      languages: Object.fromEntries(locales.map((code) => [code, `/${code}/services/${slug}`])),
    },
  }
}

export default async function ServicePage({ params }: { params: Promise<Params> }) {
  const { locale, slug } = await params
  if (!isLocale(locale)) notFound()

  const services = await loadServices(locale)
  const index = services.findIndex((doc) => doc.slug === slug)
  if (index === -1) notFound()

  const strings = ui[locale]
  const service = services[index]
  // A navegação dá a volta: do primeiro serviço a seta anterior salta para o último.
  const previous = services[(index - 1 + services.length) % services.length]
  const next = services[(index + 1) % services.length]

  return (
    <article className={styles.page}>
      {/* Degradé escuro do topo — 767px no desenho, a começar sob a faixa dourada. */}
      <div aria-hidden="true" className={styles.backdrop} />

      <DetailIntro
        intro={service.intro ? <p>{service.intro}</p> : undefined}
        navLabel={strings.serviceNav}
        next={{
          href: `/${locale}/services/${next.slug}`,
          label: `${strings.nextService}: ${fullTitle(next)}`,
        }}
        previous={{
          href: `/${locale}/services/${previous.slug}`,
          label: `${strings.previousService}: ${fullTitle(previous)}`,
        }}
        title={fullTitle(service)}
      />

      <ServiceGallery gallery={service.gallery} strings={ui[locale]} />
    </article>
  )
}

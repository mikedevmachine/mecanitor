import type { Metadata } from 'next'
import config from '@payload-config'
import { RichText } from '@payloadcms/richtext-lexical/react'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import React from 'react'

import { DetailIntro } from '@/components/detail/DetailIntro'
import { EquipmentGallery } from '@/components/equipment/EquipmentGallery'
import { isLocale, locales, ui } from '@/i18n'
import type { Equipment } from '@/payload-types'

import detail from '@/components/detail/DetailIntro.module.css'
import styles from './page.module.css'

export const dynamic = 'force-dynamic'

type Params = { locale: string; slug: string }

const fullTitle = (item: Equipment) => `${item.category} ${item.model}`

/** No desenho a categoria vem em peso fino e o modelo a negrito. */
const titleMarkup = (item: Equipment) => (
  <>
    <span className={detail.titleCategory}>{item.category} </span>
    <span className={detail.titleModel}>{item.model}</span>
  </>
)

/** Todos os equipamentos por ordem — serve o documento e os vizinhos numa só query. */
const loadEquipment = async (locale: 'pt' | 'en') => {
  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: 'equipment',
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

  const item = (await loadEquipment(locale)).find((doc) => doc.slug === slug)
  if (!item) return {}

  return {
    title: `${fullTitle(item)} — Mecanitor`,
    alternates: {
      canonical: `/${locale}/equipment/${slug}`,
      languages: Object.fromEntries(locales.map((code) => [code, `/${code}/equipment/${slug}`])),
    },
  }
}

export default async function EquipmentPage({ params }: { params: Promise<Params> }) {
  const { locale, slug } = await params
  if (!isLocale(locale)) notFound()

  const equipment = await loadEquipment(locale)
  const index = equipment.findIndex((doc) => doc.slug === slug)
  if (index === -1) notFound()

  const strings = ui[locale]
  const item = equipment[index]
  // A navegação dá a volta, tal como nas páginas de serviço.
  const previous = equipment[(index - 1 + equipment.length) % equipment.length]
  const next = equipment[(index + 1) % equipment.length]

  return (
    <article className={styles.page}>
      {/* Degradé escuro do topo — 767px no desenho, a começar sob a faixa dourada. */}
      <div aria-hidden="true" className={styles.backdrop} />

      <DetailIntro
        intro={item.intro ? <RichText data={item.intro} /> : undefined}
        navLabel={strings.equipmentNav}
        next={{
          href: `/${locale}/equipment/${next.slug}`,
          label: `${strings.nextEquipment}: ${fullTitle(next)}`,
        }}
        previous={{
          href: `/${locale}/equipment/${previous.slug}`,
          label: `${strings.previousEquipment}: ${fullTitle(previous)}`,
        }}
        title={titleMarkup(item)}
      />

      <EquipmentGallery gallery={item.gallery} />
    </article>
  )
}

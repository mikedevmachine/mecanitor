import config from '@payload-config'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import React from 'react'

import { AboutSection } from '@/components/sections/AboutSection'
import { ContactSection } from '@/components/sections/ContactSection'
import { EquipmentSection } from '@/components/sections/EquipmentSection'
import { Hero } from '@/components/sections/Hero'
import { ServicesSection } from '@/components/sections/ServicesSection'
import { isLocale, ui } from '@/i18n'

/**
 * Renderizada a pedido para que as edições no admin apareçam de imediato.
 * Quando o conteúdo estabilizar, troque por ISR (`revalidate`) + revalidação
 * on-demand a partir de hooks do Payload.
 */
export const dynamic = 'force-dynamic'

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()

  const payload = await getPayload({ config })

  const [home, contactInfo, services, equipment] = await Promise.all([
    payload.findGlobal({ slug: 'home-page', depth: 2, locale }),
    payload.findGlobal({ slug: 'contact-info', depth: 1, locale }),
    payload.find({ collection: 'services', limit: 50, sort: 'order', depth: 1, locale }),
    payload.find({ collection: 'equipment', limit: 50, sort: 'order', depth: 1, locale }),
  ])

  /*
   * No Figma cada título de secção assenta no fim da secção ANTERIOR, por cima da
   * cunha decorativa desse canto — daí cada secção receber o título da seguinte.
   */
  return (
    <>
      <Hero heroImage={home.heroImage} servicesLabel={home.servicesLabel} tagline={home.tagline} />
      <ServicesSection locale={locale} seamLabel={home.aboutLabel} services={services.docs} />
      <AboutSection blocks={home.aboutBlocks} seamLabel={home.equipmentLabel} />
      <EquipmentSection equipment={equipment.docs} locale={locale} seamLabel={home.contactLabel} />
      <ContactSection contactInfo={contactInfo} strings={ui[locale]} />
    </>
  )
}

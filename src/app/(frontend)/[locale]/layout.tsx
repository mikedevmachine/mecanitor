import type { Metadata } from 'next'
import config from '@payload-config'
import { Inter } from 'next/font/google'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import React from 'react'

import { SiteFooter } from '@/components/layout/SiteFooter'
import { SiteHeader } from '@/components/layout/SiteHeader'
import { htmlLang, isLocale, locales, ui } from '@/i18n'

import '../styles.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  // O design usa Inter em itálico real (Light/ExtraLight/SemiBold/Bold Italic) —
  // sem isto o browser sintetiza um oblíquo.
  style: ['normal', 'italic'],
})

type Params = { locale: string }

export const generateStaticParams = () => locales.map((locale) => ({ locale }))

const metadataByLocale = {
  pt: {
    title: 'Mecanitor — Inspirados pelo Design, fabricamos funcionalidade',
    description:
      'Serralharia civil em ferro, inox, alumínio e aço corten, corte laser de chapa e tubo, quinagem e soldadura laser. Fundada em 1990, em Camarate.',
  },
  en: {
    title: 'Mecanitor — Inspired by design, we manufacture function',
    description:
      'Structural metalwork in iron, stainless steel, aluminium and corten steel, laser cutting of sheet and tube, bending and laser welding. Founded in 1990, near Lisbon.',
  },
} as const

export const generateMetadata = async ({
  params,
}: {
  params: Promise<Params>
}): Promise<Metadata> => {
  const { locale } = await params
  if (!isLocale(locale)) return {}

  const meta = metadataByLocale[locale]

  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: `/${locale}`,
      // Mesmas etiquetas que o selector de idioma usa no `hrefLang`.
      languages: Object.fromEntries(locales.map((code) => [htmlLang[code], `/${code}`])),
    },
  }
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<Params>
}) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()

  const payload = await getPayload({ config })

  const [header, footer] = await Promise.all([
    payload.findGlobal({ slug: 'header', depth: 1, locale }),
    payload.findGlobal({ slug: 'footer', depth: 1, locale }),
  ])

  return (
    <html className={inter.variable} lang={htmlLang[locale]}>
      <body>
        <SiteHeader header={header} locale={locale} />
        {/* Alvo do skip link do cabeçalho. */}
        <main id="conteudo">{children}</main>
        <SiteFooter footer={footer} strings={ui[locale]} />
      </body>
    </html>
  )
}

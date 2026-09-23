import 'dotenv/config'

import config from '@payload-config'
import fs from 'fs'
import path from 'path'
import { getPayload } from 'payload'
import { fileURLToPath } from 'url'

import {
  aboutBlocks,
  equipment as equipmentSeed,
  locations,
  navItems,
  services as servicesSeed,
  tagline,
} from './content'
import {
  aboutBlocksEn,
  contactEn,
  equipmentEn,
  equipmentLinkLabelEn,
  footerCopyrightEn,
  homeLabelsEn,
  locationNamesEn,
  mapAltEn,
  navItemsEn,
  servicesEn,
  taglineEn,
} from './content.en'
import { equipmentPagesEn, equipmentPagesPt, type Run } from './content.equipment'
import { laserWeldingGalleryPt } from './content.laser-welding'
import { laserWeldingGalleryEn } from './content.laser-welding.en'
import { ironMetalworkGalleryPt } from './content.iron-metalwork'
import { ironMetalworkGalleryEn } from './content.iron-metalwork.en'
import { stainlessSteelGalleryPt } from './content.stainless-steel'
import { stainlessSteelGalleryEn } from './content.stainless-steel.en'
import { aluminiumGalleryPt } from './content.aluminium'
import { aluminiumGalleryEn } from './content.aluminium.en'
import { cortenGalleryPt } from './content.corten'
import { cortenGalleryEn } from './content.corten.en'
import { indoorGalleryPt } from './content.indoor'
import { indoorGalleryEn } from './content.indoor.en'
import { outdoorGalleryPt } from './content.outdoor'
import { outdoorGalleryEn } from './content.outdoor.en'

/*
 * Galerias grandes de mais para viverem em `content.ts`. A chave é o `slug` do
 * serviço; as duas listas têm de ter o mesmo comprimento e a mesma ordem.
 */
const bigGalleries: Record<
  string,
  {
    pt: { file: string; alt: string; client: string; location: string; description: string }[]
    en: { alt: string; client: string; location: string; description: string }[]
  }
> = {
  'laser-welding': {
    pt: laserWeldingGalleryPt.map((photo) => ({ ...photo, alt: photo.description })),
    en: laserWeldingGalleryEn.map((photo) => ({ ...photo, alt: photo.description })),
  },
  'iron-metalwork': {
    pt: ironMetalworkGalleryPt.map((photo) => ({ ...photo, alt: photo.description })),
    en: ironMetalworkGalleryEn.map((photo) => ({ ...photo, alt: photo.description })),
  },
  'stainless-steel-metalwork': {
    pt: stainlessSteelGalleryPt.map((photo) => ({ ...photo, alt: photo.description })),
    en: stainlessSteelGalleryEn.map((photo) => ({ ...photo, alt: photo.description })),
  },
  'aluminium-metalwork': {
    pt: aluminiumGalleryPt.map((photo) => ({ ...photo, alt: photo.description })),
    en: aluminiumGalleryEn.map((photo) => ({ ...photo, alt: photo.description })),
  },
  'corten-steel-metalwork': {
    pt: cortenGalleryPt.map((photo) => ({ ...photo, alt: photo.description })),
    en: cortenGalleryEn.map((photo) => ({ ...photo, alt: photo.description })),
  },
  'indoor-surface-treatment': {
    pt: indoorGalleryPt.map((photo) => ({ ...photo, alt: photo.description })),
    en: indoorGalleryEn.map((photo) => ({ ...photo, alt: photo.description })),
  },
  'outdoor-surface-treatment': {
    pt: outdoorGalleryPt.map((photo) => ({ ...photo, alt: photo.description })),
    en: outdoorGalleryEn.map((photo) => ({ ...photo, alt: photo.description })),
  },
}

const dirname = path.dirname(fileURLToPath(import.meta.url))
const assetsDir = path.resolve(dirname, 'assets')

/** Um troço de texto lexical; `bold` corresponde ao formato 1. */
const textNode = (run: Run) => ({
  type: 'text',
  detail: 0,
  format: typeof run === 'string' ? 0 : 1,
  mode: 'normal',
  style: '',
  text: typeof run === 'string' ? run : run.text,
  version: 1,
})

/** Rich text a partir de parágrafos compostos por troços. */
const richTextRuns = (paragraphs: Run[][]) => ({
  root: {
    type: 'root',
    format: '' as const,
    indent: 0,
    version: 1,
    direction: 'ltr' as const,
    children: paragraphs.map((runs) => ({
      type: 'paragraph',
      format: '' as const,
      indent: 0,
      version: 1,
      direction: 'ltr' as const,
      textFormat: 0,
      textStyle: '',
      children: runs.map(textNode),
    })),
  },
})

/** Constrói um estado lexical mínimo a partir de parágrafos de texto simples. */
const richText = (paragraphs: string[]) => ({
  root: {
    type: 'root',
    format: '' as const,
    indent: 0,
    version: 1,
    direction: 'ltr' as const,
    children: paragraphs.map((text) => ({
      type: 'paragraph',
      format: '' as const,
      indent: 0,
      version: 1,
      direction: 'ltr' as const,
      textFormat: 0,
      textStyle: '',
      children: [
        {
          type: 'text',
          detail: 0,
          format: 0,
          mode: 'normal',
          style: '',
          text,
          version: 1,
        },
      ],
    })),
  },
})

const MIME_BY_EXT: Record<string, string> = {
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
}

/**
 * Nome do ficheiro em media a partir do caminho dentro de `assets`:
 * `equipment/trubend-7050/01.jpg` → `equipment-trubend-7050-01.jpg`.
 *
 * O caminho inteiro entra no nome de propósito — várias pastas têm ficheiros
 * com o mesmo nome (`01.jpg`), e procurar só pelo nome base fazia com que a
 * fotografia de um equipamento reutilizasse a de um serviço.
 */
const mediaFilename = (relPath: string) => relPath.split('/').filter(Boolean).join('-')

const run = async () => {
  const payload = await getPayload({ config })

  // --- utilizador administrador -------------------------------------------------
  const email = process.env.SEED_ADMIN_EMAIL ?? 'admin@mecanitor.com'
  const password = process.env.SEED_ADMIN_PASSWORD ?? 'mecanitor'

  const existingUsers = await payload.find({
    collection: 'users',
    limit: 1,
    where: { email: { equals: email } },
  })

  if (existingUsers.totalDocs === 0) {
    await payload.create({ collection: 'users', data: { email, password } })
    payload.logger.info(`Utilizador criado: ${email} / ${password}`)
  }

  // --- media --------------------------------------------------------------------
  const mediaCache = new Map<string, number>()

  /** Carrega o ficheiro (se ainda não existir) e grava o `alt` nos dois idiomas. */
  const upload = async (relPath: string, alt: string, altEn: string): Promise<number> => {
    const cached = mediaCache.get(relPath)
    if (cached) return cached

    const filename = mediaFilename(relPath)

    const existing = await payload.find({
      collection: 'media',
      limit: 1,
      where: { filename: { equals: filename } },
    })

    const absolute = path.resolve(assetsDir, relPath)

    const id =
      existing.docs[0]?.id ??
      (
        await payload.create({
          collection: 'media',
          locale: 'pt',
          data: { alt },
          file: {
            data: fs.readFileSync(absolute),
            mimetype:
              MIME_BY_EXT[path.extname(relPath).toLowerCase()] ?? 'application/octet-stream',
            name: filename,
            size: fs.statSync(absolute).size,
          },
        })
      ).id

    await payload.update({ collection: 'media', id, locale: 'pt', data: { alt } })
    await payload.update({ collection: 'media', id, locale: 'en', data: { alt: altEn } })

    mediaCache.set(relPath, id)
    return id
  }

  // --- serviços -----------------------------------------------------------------
  for (const [index, service] of servicesSeed.entries()) {
    const en = servicesEn[service.slug]
    const image = await upload(service.file, service.alt, en?.alt ?? service.alt)

    const existing = await payload.find({
      collection: 'services',
      limit: 1,
      where: { slug: { equals: service.slug } },
    })

    const big = bigGalleries[service.slug]
    const galleryPt = big ? big.pt : (service.gallery ?? [])
    const galleryEn = big ? big.en : (en?.gallery ?? [])

    const gallery = []
    for (const [galleryIndex, item] of galleryPt.entries()) {
      const row = galleryEn[galleryIndex]
      // Algumas fotografias ainda não têm descrição no desenho; nesse caso o
      // texto alternativo é o do próprio serviço, que o Payload exige.
      const altPt = item.alt || service.alt
      const altEn = row?.alt || en?.alt || altPt
      gallery.push({
        image: await upload(item.file, altPt, altEn),
        client: item.client ?? null,
        location: item.location ?? null,
        description: item.description ?? null,
      })
    }

    const data = {
      title: service.title,
      titleSecondLine: service.titleSecondLine ?? null,
      slug: service.slug,
      image,
      order: index,
      intro: service.intro ?? null,
      gallery,
    }

    const id =
      existing.docs[0]?.id ??
      (await payload.create({ collection: 'services', locale: 'pt', data })).id

    await payload.update({ collection: 'services', id, locale: 'pt', data })

    if (en) {
      /*
       * `location` e `description` são localizados dentro de linhas partilhadas:
       * reutilizar os `id` das linhas escritas em português, senão o Payload
       * recria-as e apaga o texto português.
       */
      const ptDoc = await payload.findByID({ collection: 'services', id, locale: 'pt', depth: 0 })

      await payload.update({
        collection: 'services',
        id,
        locale: 'en',
        data: {
          title: en.title,
          titleSecondLine: en.titleSecondLine ?? null,
          intro: en.intro ?? service.intro ?? null,
          gallery: (ptDoc.gallery ?? []).map((row, rowIndex) => {
            const enRow = galleryEn[rowIndex]
            return {
              ...row,
              client: enRow?.client ?? row.client ?? null,
              location: enRow?.location ?? row.location ?? null,
              description: enRow?.description ?? row.description ?? null,
            }
          }),
        },
      })
    }
  }

  // --- equipamentos -------------------------------------------------------------
  for (const [index, item] of equipmentSeed.entries()) {
    const en = equipmentEn[item.slug]
    const image = await upload(item.file, item.alt, en?.alt ?? item.alt)

    const existing = await payload.find({
      collection: 'equipment',
      limit: 1,
      where: { slug: { equals: item.slug } },
    })

    const pagePt = equipmentPagesPt[item.slug]
    const pageEn = equipmentPagesEn[item.slug]

    const gallery: number[] = []
    for (const [galleryIndex, photo] of (pagePt?.gallery ?? []).entries()) {
      gallery.push(
        await upload(photo.file, photo.alt, pageEn?.galleryAlts?.[galleryIndex] ?? photo.alt),
      )
    }

    const data = {
      category: item.category,
      model: item.model,
      slug: item.slug,
      image,
      linkLabel: 'VER MAIS',
      order: index,
      intro: pagePt ? richTextRuns(pagePt.intro) : null,
      gallery,
    }

    const id =
      existing.docs[0]?.id ??
      (await payload.create({ collection: 'equipment', locale: 'pt', data })).id

    await payload.update({ collection: 'equipment', id, locale: 'pt', data })

    if (en) {
      await payload.update({
        collection: 'equipment',
        id,
        locale: 'en',
        data: {
          category: en.category,
          linkLabel: equipmentLinkLabelEn,
          intro: pageEn ? richTextRuns(pageEn.intro) : (data.intro ?? null),
        },
      })
    }
  }

  // --- globais ------------------------------------------------------------------
  /*
   * `label` é localizado dentro de um array partilhado: a escrita em inglês tem de
   * reutilizar os `id` das linhas criadas em português, caso contrário o Payload
   * recria as linhas e o texto português desaparece.
   */
  await payload.updateGlobal({ slug: 'header', locale: 'pt', data: { navItems } })

  const headerPt = await payload.findGlobal({ slug: 'header', locale: 'pt', depth: 0 })

  await payload.updateGlobal({
    slug: 'header',
    locale: 'en',
    data: {
      navItems: (headerPt.navItems ?? []).map((item, index) => ({
        ...item,
        label: navItemsEn[index]?.label ?? item.label,
      })),
    },
  })

  await payload.updateGlobal({
    slug: 'footer',
    locale: 'pt',
    data: { copyright: 'Todos os direitos reservados / MECANITOR', socialLinks: [] },
  })
  await payload.updateGlobal({
    slug: 'footer',
    locale: 'en',
    data: { copyright: footerCopyrightEn },
  })

  const blocks = []
  for (const [index, block] of aboutBlocks.entries()) {
    const en = aboutBlocksEn[index]
    blocks.push({
      title: block.title,
      body: richText(block.paragraphs),
      image: await upload(block.file, block.alt, en?.alt ?? block.alt),
      imagePosition: block.imagePosition,
      imageAspect: block.imageAspect,
      showRule: block.showRule,
    })
  }

  await payload.updateGlobal({
    slug: 'home-page',
    locale: 'pt',
    data: {
      tagline,
      servicesLabel: 'SERVIÇOS',
      aboutLabel: 'QUEM SOMOS',
      aboutBlocks: blocks,
      equipmentLabel: 'EQUIPAMENTOS',
      contactLabel: 'CONTACTOS',
    },
  })

  /*
   * Os campos localizados vivem dentro de linhas de array partilhadas, por isso a
   * versão inglesa é escrita por cima das mesmas linhas — só com o texto traduzido.
   */
  const homePt = await payload.findGlobal({ slug: 'home-page', locale: 'pt', depth: 0 })

  await payload.updateGlobal({
    slug: 'home-page',
    locale: 'en',
    data: {
      ...homeLabelsEn,
      tagline: (homePt.tagline ?? []).map((segment, index) => ({
        ...segment,
        text: taglineEn[index]?.text ?? segment.text,
      })),
      aboutBlocks: (homePt.aboutBlocks ?? []).map((block, index) => ({
        ...block,
        title: aboutBlocksEn[index]?.title ?? block.title,
        body: richText(aboutBlocksEn[index]?.paragraphs ?? []),
      })),
    },
  })

  const mapImage = await upload(
    'contact/mapa.png',
    'Mapa com as instalações da Mecanitor',
    mapAltEn,
  )

  await payload.updateGlobal({
    slug: 'contact-info',
    locale: 'pt',
    data: {
      mapImage,
      locations,
      generalEmailLabel: 'EMAIL GERAL',
      generalEmail: 'geral@mecanitor.com',
      whatsapp: {
        prefix: 'CONTACTE-NOS PELO',
        label: 'WhatsApp',
        number: '+351 935 344 841',
        url: 'https://api.whatsapp.com/',
      },
      formHeading: 'Fale connosco',
      formLabels: {
        name: 'NOME',
        email: 'E-MAIL',
        message: 'MENSAGEM',
        upload: 'CARREGAR FICHEIROS',
        submit: 'ENVIAR',
      },
    },
  })

  const contactPt = await payload.findGlobal({ slug: 'contact-info', locale: 'pt', depth: 0 })

  await payload.updateGlobal({
    slug: 'contact-info',
    locale: 'en',
    data: {
      // Moradas e telefones são os mesmos; só a designação é traduzida.
      locations: (contactPt.locations ?? []).map((location, index) => ({
        ...location,
        name: locationNamesEn[index] ?? location.name,
      })),
      generalEmailLabel: contactEn.generalEmailLabel,
      whatsapp: { prefix: contactEn.whatsappPrefix },
      formHeading: contactEn.formHeading,
      formLabels: contactEn.formLabels,
    },
  })

  payload.logger.info('Seed concluído (pt + en).')
}

await run()
process.exit(0)

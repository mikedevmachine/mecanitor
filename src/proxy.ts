import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

import { defaultLocale, isLocale, locales } from '@/i18n'

/**
 * Duas responsabilidades, por esta ordem:
 *
 * 1. Se `PREVIEW_USER` e `PREVIEW_PASSWORD` estiverem definidos, o site inteiro
 *    — admin incluído — fica atrás de HTTP Basic Auth. É assim que a versão de
 *    demonstração vive numa URL pública sem ficar aberta a toda a gente nem
 *    indexada. Sem essas variáveis o portão não existe e nada muda.
 * 2. O site público vive todo sob `/{locale}`. Tudo o que não traga prefixo de
 *    idioma é reencaminhado para o idioma preferido do browser, ou para o
 *    português. O admin e a API do Payload ficam de fora.
 */
export function proxy(request: NextRequest) {
  const denied = guardPreview(request)
  if (denied) return denied

  return withPreviewHeaders(localize(request))
}

/** `null` quando o pedido pode seguir; caso contrário, o 401 a devolver. */
const guardPreview = (request: NextRequest) => {
  if (!previewGateIsOn()) return null

  const expected = `Basic ${btoa(`${process.env.PREVIEW_USER}:${process.env.PREVIEW_PASSWORD}`)}`
  const offered = request.headers.get('authorization')

  if (offered && constantTimeEquals(offered, expected)) return null

  return new NextResponse('Acesso reservado.', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Mecanitor", charset="UTF-8"',
      'X-Robots-Tag': 'noindex, nofollow',
    },
  })
}

const localize = (request: NextRequest) => {
  const { pathname } = request.nextUrl

  // O admin e a API do Payload não têm prefixo de idioma. Só chegam aqui porque
  // o portão acima tem de os cobrir também.
  if (pathname.startsWith('/admin') || pathname.startsWith('/api')) {
    return NextResponse.next()
  }

  // Ficheiros soltos do `public` (/robots.txt, /sitemap.xml, …) também não têm
  // prefixo de idioma. Passam por aqui só para o portão os cobrir.
  if (/\.[^/]+$/.test(pathname)) return NextResponse.next()

  const hasLocale = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  )

  if (hasLocale) return NextResponse.next()

  const target = new URL(`/${preferredLocale(request)}${pathname}`, request.url)
  target.search = request.nextUrl.search

  return NextResponse.redirect(target)
}

/** Primeiro idioma do `Accept-Language` que o site conheça. */
const preferredLocale = (request: NextRequest) => {
  const header = request.headers.get('accept-language')
  if (!header) return defaultLocale

  const candidates = header
    .split(',')
    .map((part) => {
      const [tag, q] = part.trim().split(';q=')
      return { tag: tag.trim().toLowerCase(), q: q ? Number(q) : 1 }
    })
    .sort((a, b) => b.q - a.q)

  for (const { tag } of candidates) {
    const base = tag.split('-')[0]
    if (isLocale(base)) return base
  }

  return defaultLocale
}

const previewGateIsOn = () => Boolean(process.env.PREVIEW_USER && process.env.PREVIEW_PASSWORD)

/** Uma demonstração privada não tem nada que andar no Google. */
const withPreviewHeaders = (response: NextResponse) => {
  if (previewGateIsOn()) response.headers.set('X-Robots-Tag', 'noindex, nofollow')

  return response
}

/*
 * Comparar as credenciais caracter a caracter sem sair mais cedo: um `===` sobre
 * strings devolve à primeira diferença e o tempo de resposta passa a contar em
 * que posição ela está. O comprimento continua a vazar, o que não chega para
 * adivinhar a palavra-passe.
 */
const constantTimeEquals = (a: string, b: string) => {
  if (a.length !== b.length) return false

  let difference = 0
  for (let index = 0; index < a.length; index += 1) {
    difference |= a.charCodeAt(index) ^ b.charCodeAt(index)
  }

  return difference === 0
}

export const config = {
  /*
   * Exclui os ficheiros estáticos do Next, o optimizador de imagem e a rota de
   * ficheiros da media. Estes dois últimos têm de ficar fora do portão: o
   * optimizador vai buscar `/api/media/file/...` à própria origem num pedido
   * server-side, que não leva as credenciais do browser — dentro do portão as
   * imagens todas dariam 401. A media já é pública na coleção.
   *
   * Tudo o resto — incluindo `/admin` e `/api` — passa por aqui.
   */
  matcher: ['/((?!_next/static|_next/image|api/media/file|media|figma|favicon.ico).*)'],
}

'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

import { htmlLang, isLocale, localeNames, localeShortNames, locales, ui, type Locale } from '@/i18n'

import styles from './LocaleSwitcher.module.css'

type Props = {
  locale: Locale
}

/**
 * Caminho equivalente no outro idioma. Num caminho absoluto o índice 0 é `''` e
 * o idioma vive no índice 1, por isso troca-se só esse primeiro segmento:
 * `/pt/services/x` → `/en/services/x` e `/pt` → `/en`.
 */
const pathForLocale = (pathname: string, target: Locale) => {
  const segments = pathname.split('/')

  if (!isLocale(segments[1])) return `/${target}`

  segments[1] = target
  return segments.join('/')
}

/**
 * Selector de idioma. Cliente porque precisa do caminho actual (`usePathname`)
 * para se manter na mesma página ao trocar de idioma.
 *
 * O idioma activo não é ligação; o `aria-label` de cada ligação vem do
 * dicionário do idioma de **destino**, para ser lido na língua para onde leva.
 */
export const LocaleSwitcher: React.FC<Props> = ({ locale }) => {
  const pathname = usePathname()

  return (
    <nav aria-label={ui[locale].languageNav} className={styles.root}>
      <ul className={styles.list}>
        {locales.map((code) => (
          <li className={styles.item} key={code}>
            {code === locale ? (
              <span aria-current="true" className={styles.current}>
                {localeShortNames[code]}
              </span>
            ) : (
              <Link
                aria-label={ui[code].switchTo(localeNames[code])}
                className={styles.link}
                href={pathForLocale(pathname, code)}
                hrefLang={htmlLang[code]}
              >
                {localeShortNames[code]}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default LocaleSwitcher

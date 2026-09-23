import Link from 'next/link'
import React from 'react'

import { LocaleSwitcher } from '@/components/layout/LocaleSwitcher'
import { MobileNav } from '@/components/layout/MobileNav'
import { navHref, ui, type Locale } from '@/i18n'
import type { Header } from '@/payload-types'

import styles from './SiteHeader.module.css'

type NavItem = NonNullable<Header['navItems']>[number]

/** Fallback (pt-PT) usado enquanto o global "Cabeçalho" não tiver navegação definida. */
const fallbackNavItems: NavItem[] = [
  { href: '#services', label: 'SERVIÇOS' },
  { href: '/portfolio', label: 'PORTFÓLIO' },
  { href: '#about', label: 'QUEM SOMOS' },
  { href: '#equipment', label: 'EQUIPAMENTOS' },
  { href: '#contact', label: 'CONTACTOS' },
]

type Props = {
  header: Header
  locale: Locale
}

/**
 * Cabeçalho fixo de 137px (`--header-height`): risco dourado de 11px
 * (`--header-bar`) + faixa de 126px (`--header-strip`) com a textura
 * `header-bg.png`. O logótipo arranca no topo com 209px de altura, pelo que
 * transborda 62px para dentro do hero — daí `overflow: visible` e o `z-index: 50`.
 *
 * O logótipo só chega aos 499px a partir dos 1280px: entre os 1024px e os 1280px
 * fica nos 340px para não colidir com a navegação, que passa a horizontal aos 1024px.
 *
 * Os rótulos de acessibilidade vêm de `ui[locale]`; os itens de navegação vêm do
 * CMS (já traduzidos pelo Payload) e as ligações internas levam prefixo de idioma.
 */
export const SiteHeader: React.FC<Props> = ({ header, locale }) => {
  const navItems = header.navItems?.length ? header.navItems : fallbackNavItems
  const strings = ui[locale]

  return (
    <header className={styles.header}>
      {/* O alvo `id="conteudo"` está no `<main>` do layout. */}
      <a className={styles.skipLink} href="#conteudo">
        {strings.skipToContent}
      </a>

      <div aria-hidden="true" className={styles.bar} />

      <div className={styles.strip}>
        <div className={styles.navRow}>
          <nav aria-label={strings.mainNav} className={styles.nav}>
            <ul className={styles.navList}>
              {navItems.map((item) => (
                <li key={item.id ?? item.href}>
                  <a className={styles.navLink} href={navHref(item.href, locale)}>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className={styles.switcher}>
            <LocaleSwitcher locale={locale} />
          </div>
        </div>

        <MobileNav items={navItems} locale={locale} />
      </div>

      <Link aria-label={strings.home} className={styles.logo} href={`/${locale}`}>
        {/* SVG estático: `<img>` para manter o rácio intrínseco 499.156 × 209. */}
        {/* O `alt` é o nome da marca — não se traduz, e o `aria-label` da ligação manda. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt="Mecanitor"
          className={styles.logoImage}
          height={209}
          src="/figma/logo-mecanitor.svg"
          width={499}
        />
        {/*
          Só esta zona — limitada à altura do cabeçalho — é que recebe cliques;
          os 62px que transbordam para o hero ficam inertes (ver `pointer-events: none`
          na ligação), caso contrário apanhariam cliques em toda a página.
        */}
        <span aria-hidden="true" className={styles.logoHit} />
      </Link>
    </header>
  )
}

export default SiteHeader

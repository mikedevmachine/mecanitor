'use client'

import React, { useEffect, useState } from 'react'

import { LocaleSwitcher } from '@/components/layout/LocaleSwitcher'
import { navHref, ui, type Locale } from '@/i18n'
import type { Header } from '@/payload-types'

import styles from './MobileNav.module.css'

type NavItem = NonNullable<Header['navItems']>[number]

type Props = {
  items: NavItem[]
  locale: Locale
}

/**
 * Fronteira de cliente mínima: só o botão do menu e o painel que ele abre.
 * Abaixo dos 1024px substitui a navegação horizontal do cabeçalho e é aqui que
 * vive o selector de idioma, como última linha do painel.
 */
export const MobileNav: React.FC<Props> = ({ items, locale }) => {
  const [open, setOpen] = useState(false)
  const strings = ui[locale]

  useEffect(() => {
    if (!open) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open])

  return (
    <div className={styles.root}>
      <button
        aria-controls="menu-principal"
        aria-expanded={open}
        aria-label={open ? strings.closeMenu : strings.openMenu}
        className={open ? `${styles.toggle} ${styles.toggleOpen}` : styles.toggle}
        onClick={() => setOpen((previous) => !previous)}
        type="button"
      >
        <span aria-hidden="true" className={`${styles.bar} ${styles.barTop}`} />
        <span aria-hidden="true" className={`${styles.bar} ${styles.barMiddle}`} />
        <span aria-hidden="true" className={`${styles.bar} ${styles.barBottom}`} />
      </button>

      {/*
        O painel é a caixa que o botão comanda (`aria-controls`); lá dentro a
        navegação e o selector de idioma ficam em `<nav>` irmãos, para não
        aninhar landmarks um dentro do outro.
      */}
      <div
        className={open ? `${styles.panel} ${styles.panelOpen}` : styles.panel}
        id="menu-principal"
      >
        <nav aria-label={strings.mainNav}>
          <ul className={styles.panelList}>
            {items.map((item) => (
              <li key={item.id ?? item.href}>
                <a
                  className={styles.panelLink}
                  href={navHref(item.href, locale)}
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.panelLocale}>
          <LocaleSwitcher locale={locale} />
        </div>
      </div>
    </div>
  )
}

export default MobileNav

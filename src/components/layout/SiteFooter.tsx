import Image from 'next/image'
import React from 'react'

import type { UiStrings } from '@/i18n'
import type { Footer } from '@/payload-types'

import styles from './SiteFooter.module.css'

type SocialPlatform = NonNullable<Footer['socialLinks']>[number]['platform']

/** Marcas próprias — iguais nos dois idiomas. O 'email' não é marca: vem de `strings`. */
const socialLabels: Record<Exclude<SocialPlatform, 'email'>, string> = {
  facebook: 'Facebook',
  instagram: 'Instagram',
  linkedin: 'LinkedIn',
  youtube: 'YouTube',
}

/** Ícones sólidos 24×24, desenhados com `currentColor`. */
const socialPaths: Record<SocialPlatform, string> = {
  email:
    'M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z',
  facebook:
    'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z',
  instagram:
    'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z',
  linkedin:
    'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z',
  youtube:
    'M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z',
}

type Props = {
  footer: Footer
  strings: UiStrings
}

/**
 * Rodapé: linha única de 1326px de conteúdo (mais as goteiras de 24px),
 * copyright à esquerda e redes sociais à direita. Empilha abaixo de 768px.
 */
export const SiteFooter: React.FC<Props> = ({ footer, strings }) => {
  const socialLinks = footer.socialLinks ?? []

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <p className={styles.copyright}>{footer.copyright}</p>

        {socialLinks.length > 0 ? (
          <ul aria-label={strings.socialLinks} className={styles.social}>
            {socialLinks.map((link) => (
              <li key={link.id ?? `${link.platform}-${link.url}`}>
                <a
                  aria-label={
                    link.platform === 'email' ? strings.socialEmail : socialLabels[link.platform]
                  }
                  className={styles.socialLink}
                  href={link.url}
                  rel="noreferrer"
                  target="_blank"
                >
                  <svg
                    aria-hidden="true"
                    className={styles.icon}
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d={socialPaths[link.platform]} />
                  </svg>
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <Image
            alt={strings.socialLinks}
            className={styles.strip}
            height={133}
            src="/figma/social-icons.png"
            width={391}
          />
        )}
      </div>
    </footer>
  )
}

export default SiteFooter

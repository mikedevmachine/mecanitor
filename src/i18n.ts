/**
 * Idiomas do site público. Tem de coincidir com `localization.locales`
 * em `src/payload.config.ts`.
 */
export const locales = ['pt', 'en'] as const

export type Locale = (typeof locales)[number]

export const defaultLocale: Locale = 'pt'

export const localeNames: Record<Locale, string> = {
  pt: 'Português',
  en: 'English',
}

/** Código curto mostrado no selector de idioma. */
export const localeShortNames: Record<Locale, string> = {
  pt: 'PT',
  en: 'EN',
}

/** Atributo `lang` do documento. */
export const htmlLang: Record<Locale, string> = {
  pt: 'pt-PT',
  en: 'en',
}

export const isLocale = (value: string): value is Locale =>
  (locales as readonly string[]).includes(value)

/**
 * Textos da interface que não vivem no CMS (rótulos de acessibilidade,
 * mensagens do formulário e afins).
 */
export const ui = {
  pt: {
    skipToContent: 'Saltar para o conteúdo',
    home: 'Mecanitor — página inicial',
    openMenu: 'Abrir menu',
    closeMenu: 'Fechar menu',
    mainNav: 'Navegação principal',
    languageNav: 'Idioma',
    switchTo: (language: string) => `Ver em ${language}`,
    socialLinks: 'Redes sociais',
    socialEmail: 'E-mail',
    whatsappAria: 'Contactar por WhatsApp',
    formSending: 'A enviar…',
    formSuccess: 'Mensagem enviada. Entraremos em contacto brevemente.',
    formFilesChosen: (count: number) =>
      count === 1 ? '1 ficheiro escolhido' : `${count} ficheiros escolhidos`,
    formFileHint: 'Até 5 ficheiros, 8 MB cada.',
    serviceNav: 'Navegação entre serviços',
    previousService: 'Serviço anterior',
    nextService: 'Serviço seguinte',
    backToServices: 'Voltar aos serviços',
    equipmentNav: 'Navegação entre equipamentos',
    previousEquipment: 'Equipamento anterior',
    nextEquipment: 'Equipamento seguinte',
    galleryOpen: 'Ver em detalhe',
    galleryClose: 'Fechar',
    galleryPrevious: 'Imagem anterior',
    galleryNext: 'Imagem seguinte',
    galleryDialog: 'Detalhe do trabalho',
    galleryClient: 'Cliente',
    galleryLocation: 'Localização',
    galleryDescription: 'Descrição',
    formErrors: {
      missingFields: 'Preencha o nome, o e-mail e a mensagem.',
      invalidEmail: 'Indique um endereço de e-mail válido.',
      tooManyFiles: 'Anexe no máximo 5 ficheiros.',
      fileTooLarge: 'Cada ficheiro tem de ter menos de 3 MB, e os anexos menos de 4 MB no total.',
      failed: 'Não foi possível enviar a mensagem. Tente novamente.',
    },
  },
  en: {
    skipToContent: 'Skip to content',
    home: 'Mecanitor — home',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    mainNav: 'Main navigation',
    languageNav: 'Language',
    switchTo: (language: string) => `View in ${language}`,
    socialLinks: 'Social links',
    socialEmail: 'Email',
    whatsappAria: 'Contact us on WhatsApp',
    formSending: 'Sending…',
    formSuccess: 'Message sent. We will get back to you shortly.',
    formFilesChosen: (count: number) =>
      count === 1 ? '1 file selected' : `${count} files selected`,
    formFileHint: 'Up to 5 files, 8 MB each.',
    serviceNav: 'Service navigation',
    previousService: 'Previous service',
    nextService: 'Next service',
    backToServices: 'Back to services',
    equipmentNav: 'Equipment navigation',
    previousEquipment: 'Previous equipment',
    nextEquipment: 'Next equipment',
    galleryOpen: 'View in detail',
    galleryClose: 'Close',
    galleryPrevious: 'Previous image',
    galleryNext: 'Next image',
    galleryDialog: 'Project detail',
    galleryClient: 'Client',
    galleryLocation: 'Location',
    galleryDescription: 'Description',
    formErrors: {
      missingFields: 'Please fill in your name, e-mail and message.',
      invalidEmail: 'Please enter a valid e-mail address.',
      tooManyFiles: 'Attach no more than 5 files.',
      fileTooLarge: 'Each file must be under 3 MB, and all attachments under 4 MB in total.',
      failed: 'The message could not be sent. Please try again.',
    },
  },
} satisfies Record<Locale, Record<string, unknown>>

export type UiStrings = (typeof ui)[Locale]

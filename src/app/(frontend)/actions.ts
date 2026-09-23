'use server'

import config from '@payload-config'
import { getPayload } from 'payload'

/**
 * Códigos de erro em vez de texto: a tradução é escolhida no cliente a partir
 * de `ui[locale].formErrors`, para não depender de um idioma enviado pelo browser.
 */
export type ContactErrorCode =
  'missingFields' | 'invalidEmail' | 'tooManyFiles' | 'fileTooLarge' | 'failed'

export type ContactActionState =
  { status: 'idle' } | { status: 'success' } | { status: 'error'; code: ContactErrorCode }

/*
 * Mantenha alinhado com `experimental.serverActions.bodySizeLimit` em
 * next.config.ts e com as cópias em ContactForm.tsx. O tecto real não é nosso:
 * uma função serverless da Vercel recusa corpos acima de 4,5 MB antes de a
 * action correr, por isso o total de anexos tem de caber abaixo disso.
 */
const MAX_FILE_BYTES = 3 * 1024 * 1024
const MAX_TOTAL_BYTES = 4 * 1024 * 1024
const MAX_FILES = 5

/**
 * Recebe o formulário "Fale connosco" e grava-o na coleção `contact-submissions`.
 * Os anexos são guardados como documentos `media`.
 */
export async function submitContact(
  _prev: ContactActionState,
  formData: FormData,
): Promise<ContactActionState> {
  const name = String(formData.get('name') ?? '').trim()
  const email = String(formData.get('email') ?? '').trim()
  const message = String(formData.get('message') ?? '').trim()

  if (!name || !email || !message) {
    return { status: 'error', code: 'missingFields' }
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { status: 'error', code: 'invalidEmail' }
  }

  const files = formData
    .getAll('attachments')
    .filter((entry): entry is File => entry instanceof File && entry.size > 0)

  if (files.length > MAX_FILES) {
    return { status: 'error', code: 'tooManyFiles' }
  }

  if (files.some((file) => file.size > MAX_FILE_BYTES)) {
    return { status: 'error', code: 'fileTooLarge' }
  }

  if (files.reduce((total, file) => total + file.size, 0) > MAX_TOTAL_BYTES) {
    return { status: 'error', code: 'fileTooLarge' }
  }

  try {
    const payload = await getPayload({ config })

    const attachments: number[] = []

    for (const file of files) {
      const uploaded = await payload.create({
        collection: 'media',
        data: { alt: `Anexo de ${name} — ${file.name}` },
        file: {
          data: Buffer.from(await file.arrayBuffer()),
          mimetype: file.type,
          name: file.name,
          size: file.size,
        },
      })

      attachments.push(uploaded.id)
    }

    await payload.create({
      collection: 'contact-submissions',
      data: { name, email, message, attachments },
    })

    return { status: 'success' }
  } catch (error) {
    console.error('submitContact failed', error)
    return { status: 'error', code: 'failed' }
  }
}

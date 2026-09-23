'use client'

import React, { startTransition, useActionState, useId, useRef, useState } from 'react'

import {
  submitContact,
  type ContactActionState,
  type ContactErrorCode,
} from '@/app/(frontend)/actions'
import type { ContactInfo } from '@/payload-types'

import styles from './ContactForm.module.css'

/**
 * `ui[locale]` na forma de que o formulário precisa. Difere de `UiStrings` num
 * único ponto: `formFilesChosen` chega como lista já resolvida, indexada pela
 * contagem de anexos (0…MAX_FILES). `ContactSection` é um Server Component e
 * uma fronteira Server → Client não serializa funções.
 */
export type ContactFormStrings = {
  formSending: string
  formSuccess: string
  formFileHint: string
  formErrors: Record<ContactErrorCode, string>
  formFilesChosen: readonly string[]
}

type Props = {
  labels: NonNullable<ContactInfo['formLabels']>
  strings: ContactFormStrings
}

const initialState: ContactActionState = { status: 'idle' }

/** Espelham os limites já validados em `src/app/(frontend)/actions.ts`. */
const MAX_FILES = 5
const MAX_FILE_BYTES = 3 * 1024 * 1024
const MAX_TOTAL_BYTES = 4 * 1024 * 1024

/**
 * Formulário "Fale connosco". Liga-se à server action `submitContact`
 * (`src/app/(frontend)/actions.ts`) através do `useActionState` do React 19.
 */
export const ContactForm: React.FC<Props> = ({ labels, strings }) => {
  const [state, formAction, isPending] = useActionState(submitContact, initialState)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [fileCount, setFileCount] = useState(0)
  const [fileErrorCode, setFileErrorCode] = useState<ContactErrorCode | null>(null)
  const hintId = useId()

  if (state.status === 'success') {
    return (
      <p className={styles.success} role="status">
        {strings.formSuccess}
      </p>
    )
  }

  // Fallback pt-PT — usado só enquanto o CMS não tiver o rótulo preenchido.
  const uploadLabel = labels.upload ?? 'CARREGAR FICHEIROS'

  const uploadButtonLabel =
    fileCount > 0 ? (strings.formFilesChosen[fileCount] ?? uploadLabel) : uploadLabel

  /*
   * Os anexos seguem no corpo da server action, cujo limite de transporte é
   * aplicado antes de `submitContact` correr — uma seleção demasiado grande
   * rebentaria o pedido em vez de chegar à mensagem de erro do formulário.
   * Validamos aqui, com os mesmos limites da action, e limpamos a seleção.
   * O erro é guardado como código, tal como a action o devolve, e só é
   * traduzido na renderização.
   */
  const handleFilesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.currentTarget
    const files = Array.from(input.files ?? [])

    const code: ContactErrorCode | null =
      files.length > MAX_FILES
        ? 'tooManyFiles'
        : files.some((file) => file.size > MAX_FILE_BYTES)
          ? 'fileTooLarge'
          : files.reduce((total, file) => total + file.size, 0) > MAX_TOTAL_BYTES
            ? 'fileTooLarge'
            : null

    if (code) {
      input.value = ''
      setFileCount(0)
      setFileErrorCode(code)
      return
    }

    setFileErrorCode(null)
    setFileCount(files.length)
  }

  /*
   * O React 19 repõe um formulário não controlado assim que a action que ele
   * próprio despoletou termina — apagaria o nome, o e-mail, a mensagem e os
   * anexos exactamente quando a mensagem de erro pede ao visitante que os
   * corrija. Por isso somos nós a invocar a action: o `preventDefault` trava o
   * caminho interno do React, que só pede `requestFormReset` quando é ele a
   * despoletar a action. O `action` no `<form>` fica como está, a servir quem
   * navegue sem JavaScript.
   */
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)

    // O aviso do lado do cliente não diz respeito ao envio que agora começa.
    setFileErrorCode(null)

    startTransition(() => {
      formAction(formData)
    })
  }

  const errorCode = fileErrorCode ?? (state.status === 'error' ? state.code : null)
  const errorMessage = errorCode ? strings.formErrors[errorCode] : null

  return (
    <form action={formAction} className={styles.form} onSubmit={handleSubmit}>
      <div>
        <label className={styles.label} htmlFor="contact-name">
          {/* Fallback pt-PT — usado só enquanto o CMS não tiver o rótulo preenchido. */}
          {labels.name ?? 'NOME'}
        </label>
        <input
          autoComplete="name"
          className={styles.input}
          id="contact-name"
          name="name"
          required
          type="text"
        />
      </div>

      <div>
        <label className={styles.label} htmlFor="contact-email">
          {/* Fallback pt-PT — usado só enquanto o CMS não tiver o rótulo preenchido. */}
          {labels.email ?? 'E-MAIL'}
        </label>
        <input
          autoComplete="email"
          className={styles.input}
          id="contact-email"
          name="email"
          required
          type="email"
        />
      </div>

      <div>
        <label className={styles.label} htmlFor="contact-message">
          {/* Fallback pt-PT — usado só enquanto o CMS não tiver o rótulo preenchido. */}
          {labels.message ?? 'MENSAGEM'}
        </label>
        <textarea className={styles.textarea} id="contact-message" name="message" required />
      </div>

      <input
        aria-label={uploadLabel}
        className={styles.fileInput}
        multiple
        name="attachments"
        onChange={handleFilesChange}
        ref={fileInputRef}
        type="file"
      />

      {errorMessage ? (
        <p className={styles.error} role="alert">
          {errorMessage}
        </p>
      ) : null}

      <div className={styles.footer}>
        <p className={styles.fileHint} id={hintId}>
          {strings.formFileHint}
        </p>

        <div className={styles.actions}>
          <button
            aria-describedby={hintId}
            className={styles.uploadButton}
            onClick={() => fileInputRef.current?.click()}
            type="button"
          >
            {uploadButtonLabel}
          </button>
          <button className={styles.submitButton} disabled={isPending} type="submit">
            {/* Fallback pt-PT — usado só enquanto o CMS não tiver o rótulo preenchido. */}
            {isPending ? strings.formSending : (labels.submit ?? 'ENVIAR')}
          </button>
        </div>
      </div>
    </form>
  )
}

export default ContactForm

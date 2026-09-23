import type { GlobalConfig } from 'payload'

export const ContactInfo: GlobalConfig = {
  slug: 'contact-info',
  label: 'Contactos',
  admin: { group: 'Contactos' },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'mapImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Mapa',
    },
    {
      name: 'locations',
      type: 'array',
      label: 'Moradas',
      fields: [
        { name: 'name', type: 'text', required: true, localized: true, label: 'Designação' },
        {
          name: 'addressLines',
          type: 'array',
          label: 'Linhas da morada',
          required: true,
          fields: [{ name: 'line', type: 'text', required: true, localized: true }],
        },
        {
          name: 'phoneLabel',
          type: 'text',
          label: 'Prefixo do telefone',
          admin: { description: 'Ex.: T • ou TM •' },
        },
        {
          name: 'phone',
          type: 'text',
          label: 'Telefone',
          admin: {
            description:
              'Como deve aparecer no site. O link de chamada assume Portugal (+351); para outro país, escreva o número já com o indicativo (ex.: +34 …).',
          },
        },
        {
          name: 'mapUrl',
          type: 'text',
          label: 'Link do mapa',
          admin: {
            description:
              'Opcional. Sem link, a morada abre uma pesquisa no Google Maps com o endereço escrito acima.',
          },
        },
      ],
    },
    {
      name: 'generalEmailLabel',
      type: 'text',
      localized: true,
      defaultValue: 'EMAIL GERAL',
    },
    {
      name: 'generalEmail',
      type: 'email',
      required: true,
      defaultValue: 'geral@mecanitor.com',
    },
    {
      name: 'whatsapp',
      type: 'group',
      label: 'WhatsApp',
      fields: [
        { name: 'prefix', type: 'text', localized: true, defaultValue: 'CONTACTE-NOS PELO' },
        { name: 'label', type: 'text', defaultValue: 'WhatsApp' },
        {
          name: 'number',
          type: 'text',
          label: 'Número',
          defaultValue: '+351 935 344 841',
          admin: {
            description: 'O link wa.me é construído a partir deste número.',
          },
        },
        {
          name: 'url',
          type: 'text',
          defaultValue: 'https://api.whatsapp.com/',
          admin: {
            description: 'Usado apenas se o número estiver vazio.',
          },
        },
      ],
    },
    {
      name: 'formHeading',
      type: 'text',
      required: true,
      localized: true,
      defaultValue: 'Fale connosco',
    },
    {
      name: 'formLabels',
      type: 'group',
      label: 'Etiquetas do formulário',
      fields: [
        { name: 'name', type: 'text', localized: true, defaultValue: 'NOME' },
        { name: 'email', type: 'text', localized: true, defaultValue: 'E-MAIL' },
        { name: 'message', type: 'text', localized: true, defaultValue: 'MENSAGEM' },
        { name: 'upload', type: 'text', localized: true, defaultValue: 'CARREGAR FICHEIROS' },
        { name: 'submit', type: 'text', localized: true, defaultValue: 'ENVIAR' },
      ],
    },
  ],
}

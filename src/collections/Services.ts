import type { CollectionConfig } from 'payload'

/**
 * Cards da secção "Serviços" da homepage.
 * O título é composto por duas linhas, tal como no design.
 */
export const Services: CollectionConfig = {
  slug: 'services',
  labels: {
    singular: 'Serviço',
    plural: 'Serviços',
  },
  admin: {
    group: 'Conteúdo',
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'order'],
  },
  access: {
    read: () => true,
  },
  defaultSort: 'order',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
      label: 'Título (linha 1)',
    },
    {
      name: 'titleSecondLine',
      type: 'text',
      localized: true,
      label: 'Título (linha 2)',
      admin: {
        description: 'Opcional. O design quebra a maioria dos títulos em duas linhas.',
      },
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: {
        description: 'Usado no link do card, ex.: /services/tube-laser-cutting',
      },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Imagem',
    },
    {
      name: 'order',
      type: 'number',
      required: true,
      defaultValue: 0,
      label: 'Ordem',
    },
    {
      name: 'intro',
      type: 'textarea',
      localized: true,
      label: 'Introdução',
      admin: {
        description: 'Parágrafo no topo da página do serviço.',
      },
    },
    {
      name: 'gallery',
      type: 'array',
      label: 'Galeria',
      admin: {
        description:
          'Trabalhos mostrados na grelha da página do serviço. Cada um abre em janela com a ficha abaixo; as linhas sem texto não aparecem.',
      },
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
          label: 'Imagem',
        },
        {
          name: 'client',
          type: 'text',
          localized: true,
          label: 'Cliente',
        },
        {
          name: 'location',
          type: 'text',
          localized: true,
          label: 'Localização',
        },
        {
          name: 'description',
          type: 'textarea',
          localized: true,
          label: 'Descrição',
        },
      ],
    },
  ],
}

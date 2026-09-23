import type { CollectionConfig } from 'payload'

/**
 * Cards da secção "Equipamentos" da homepage.
 * Cabeçalho cinzento com categoria (leve) + modelo (negrito), imagem do produto e "VER MAIS".
 */
export const Equipment: CollectionConfig = {
  slug: 'equipment',
  labels: {
    singular: 'Equipamento',
    plural: 'Equipamentos',
  },
  admin: {
    group: 'Conteúdo',
    useAsTitle: 'model',
    defaultColumns: ['model', 'category', 'order'],
  },
  access: {
    read: () => true,
  },
  defaultSort: 'order',
  fields: [
    {
      name: 'category',
      type: 'text',
      required: true,
      localized: true,
      label: 'Categoria',
      admin: { description: 'Ex.: Quinadora, Corte a Laser, Soldadura Laser' },
    },
    {
      name: 'model',
      type: 'text',
      required: true,
      label: 'Modelo',
      admin: { description: 'Ex.: Trumpf TruBend 7050' },
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Imagem do produto',
    },
    {
      name: 'linkLabel',
      type: 'text',
      defaultValue: 'VER MAIS',
      localized: true,
      label: 'Texto do link',
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
      type: 'richText',
      localized: true,
      label: 'Introdução',
      admin: {
        description: 'Texto no topo da página do equipamento.',
      },
    },
    {
      name: 'gallery',
      type: 'upload',
      relationTo: 'media',
      hasMany: true,
      label: 'Galeria',
      admin: {
        description:
          'Fotografias a toda a largura, empilhadas por baixo do texto. O design usa duas.',
      },
    },
  ],
}

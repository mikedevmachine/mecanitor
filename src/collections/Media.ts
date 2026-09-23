import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  admin: {
    group: 'Biblioteca',
    useAsTitle: 'alt',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
      localized: true,
      label: 'Texto alternativo',
    },
  ],
  upload: {
    mimeTypes: ['image/*'],
    focalPoint: true,
  },
}

import type { GlobalConfig } from 'payload'

export const HomePage: GlobalConfig = {
  slug: 'home-page',
  label: 'Homepage',
  admin: { group: 'Conteúdo' },
  access: {
    read: () => true,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Hero',
          fields: [
            {
              name: 'heroImage',
              type: 'upload',
              relationTo: 'media',
              label: 'Imagem de fundo',
              admin: {
                description:
                  'Se vazio, é usada a imagem estática /figma/hero.jpg incluída no projeto.',
              },
            },
            {
              name: 'tagline',
              type: 'array',
              label: 'Assinatura',
              admin: {
                description:
                  'Cada segmento é concatenado numa única linha. Marque "destaque" para as palavras a negrito.',
              },
              fields: [
                { name: 'text', type: 'text', required: true, localized: true },
                { name: 'emphasis', type: 'checkbox', label: 'Destaque', defaultValue: false },
              ],
            },
          ],
        },
        {
          label: 'Serviços',
          fields: [
            {
              name: 'servicesLabel',
              type: 'text',
              required: true,
              localized: true,
              defaultValue: 'SERVIÇOS',
            },
          ],
        },
        {
          label: 'Quem Somos',
          fields: [
            {
              name: 'aboutLabel',
              type: 'text',
              required: true,
              localized: true,
              defaultValue: 'QUEM SOMOS',
            },
            {
              name: 'aboutBlocks',
              type: 'array',
              label: 'Blocos',
              fields: [
                { name: 'title', type: 'text', required: true, localized: true },
                { name: 'body', type: 'richText', required: true, localized: true },
                {
                  name: 'image',
                  type: 'upload',
                  relationTo: 'media',
                  required: true,
                },
                {
                  name: 'imagePosition',
                  type: 'select',
                  required: true,
                  defaultValue: 'right',
                  options: [
                    { label: 'Direita', value: 'right' },
                    { label: 'Esquerda', value: 'left' },
                  ],
                },
                {
                  name: 'imageAspect',
                  type: 'select',
                  required: true,
                  defaultValue: 'auto',
                  label: 'Formato da imagem',
                  admin: {
                    description:
                      'Recorte aplicado à imagem. "Original" mantém as proporções do ficheiro.',
                  },
                  options: [
                    { label: 'Original', value: 'auto' },
                    { label: 'Panorâmica (5:4)', value: '5/4' },
                    { label: 'Quadrada (1:1)', value: '1/1' },
                    { label: 'Retrato (3:4)', value: '3/4' },
                  ],
                },
                {
                  name: 'showRule',
                  type: 'checkbox',
                  label: 'Mostrar risco dourado sob o título',
                  defaultValue: true,
                },
              ],
            },
          ],
        },
        {
          label: 'Equipamentos',
          fields: [
            {
              name: 'equipmentLabel',
              type: 'text',
              required: true,
              localized: true,
              defaultValue: 'EQUIPAMENTOS',
            },
          ],
        },
        {
          label: 'Contactos',
          fields: [
            {
              name: 'contactLabel',
              type: 'text',
              required: true,
              localized: true,
              defaultValue: 'CONTACTOS',
            },
          ],
        },
      ],
    },
  ],
}

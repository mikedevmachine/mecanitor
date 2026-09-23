import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Services } from './collections/Services'
import { Equipment } from './collections/Equipment'
import { ContactSubmissions } from './collections/ContactSubmissions'
import { Header } from './globals/Header'
import { Footer } from './globals/Footer'
import { HomePage } from './globals/HomePage'
import { ContactInfo } from './globals/ContactInfo'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    meta: {
      titleSuffix: '— Mecanitor',
    },
  },
  collections: [Users, Media, Services, Equipment, ContactSubmissions],
  globals: [Header, HomePage, ContactInfo, Footer],
  localization: {
    locales: [
      { code: 'pt', label: 'Português' },
      { code: 'en', label: 'English' },
    ],
    defaultLocale: 'pt',
    // Uma tradução por preencher cai para o português em vez de aparecer vazia.
    fallback: true,
  },
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: sqliteAdapter({
    client: {
      url: process.env.DATABASE_URI || 'file:./mecanitor.db',
      // Só o Turso (libSQL remoto) o usa; em ficheiro local fica por definir.
      authToken: process.env.DATABASE_AUTH_TOKEN,
    },
  }),
  sharp,
  plugins: [
    /*
     * Sem `BLOB_READ_WRITE_TOKEN` o plugin desliga-se sozinho e a media volta ao
     * disco local (./media) — é o que queremos em desenvolvimento. Em Vercel o
     * disco é efémero e só de leitura, por isso lá o token tem de existir.
     */
    vercelBlobStorage({
      // Mantém o campo `prefix` no schema mesmo com o plugin desligado, para a
      // base local e a do Turso não divergirem.
      alwaysInsertFields: true,
      token: process.env.BLOB_READ_WRITE_TOKEN,
      collections: {
        media: true,
      },
    }),
  ],
})

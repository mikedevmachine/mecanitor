import { withPayload } from '@payloadcms/next/withPayload'
import type { NextConfig } from 'next'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(__filename)

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      // O formulário "Fale connosco" aceita até 5 anexos, 3 MB cada e 4 MB no
      // total (ver src/app/(frontend)/actions.ts). A folga cobre os campos de
      // texto e o overhead do multipart.
      bodySizeLimit: '5mb',
    },
  },
  images: {
    /*
     * Com o Vercel Blob ligado, `media.url` deixa de ser um caminho local e
     * passa a apontar para o bucket. Sem isto o optimizador devolve 400.
     */
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.public.blob.vercel-storage.com',
        port: '',
        search: '',
      },
    ],
    localPatterns: [
      {
        pathname: '/api/media/file/**',
      },
      {
        pathname: '/figma/**',
      },
    ],
  },
  webpack: (webpackConfig) => {
    webpackConfig.resolve.extensionAlias = {
      '.cjs': ['.cts', '.cjs'],
      '.js': ['.ts', '.tsx', '.js', '.jsx'],
      '.mjs': ['.mts', '.mjs'],
    }

    return webpackConfig
  },
  turbopack: {
    root: path.resolve(dirname),
  },
}

export default withPayload(nextConfig, { devBundleServerPackages: false })

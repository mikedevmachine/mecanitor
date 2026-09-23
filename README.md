# Mecanitor — site institucional

Next.js 16 (App Router) + Payload CMS 3 sobre SQLite, com CSS Modules. A homepage é uma transcrição do ficheiro Figma
_Site Mecanitor_ (`rQBCBQasQvkk8WGm1HMbTG`, frame `Home page` / node `1:2`).

## Arranque

```bash
pnpm install
cp .env.example .env      # ajuste PAYLOAD_SECRET
pnpm seed                 # cria o utilizador admin, a media e o conteúdo da homepage
pnpm dev
```

- Site: http://localhost:3000 (reencaminha para /pt ou /en)
- Admin: http://localhost:3000/admin (por omissão `admin@mecanitor.com` / `mecanitor`,
  configurável com `SEED_ADMIN_EMAIL` e `SEED_ADMIN_PASSWORD`)

O `pnpm seed` é idempotente: volta a correr sem duplicar media nem documentos.

## Variáveis de ambiente

| Variável                                   | Para que serve                                                       |
| ------------------------------------------ | -------------------------------------------------------------------- |
| `DATABASE_URI`                             | Ligação SQLite, por omissão `file:./mecanitor.db`                    |
| `DATABASE_AUTH_TOKEN`                      | Só para libSQL remoto (Turso); em ficheiro local fica vazio          |
| `PAYLOAD_SECRET`                           | Segredo de assinatura do Payload — **obrigatório mudar em produção** |
| `NEXT_PUBLIC_SERVER_URL`                   | URL público do site                                                  |
| `SEED_ADMIN_EMAIL` / `SEED_ADMIN_PASSWORD` | Credenciais criadas pelo seed                                        |
| `BLOB_READ_WRITE_TOKEN`                    | Vercel Blob; por preencher, a media fica em `./media`                |
| `PREVIEW_USER` / `PREVIEW_PASSWORD`        | Os dois preenchidos fecham o site atrás de Basic Auth                |

Para trocar de base de dados basta substituir o adaptador em `src/payload.config.ts`
(`@payloadcms/db-postgres` ou `@payloadcms/db-mongodb`) — nada mais no projeto depende do SQLite.

Para pôr o site online (Vercel + Turso + Vercel Blob, tudo em plano gratuito), ver [DEPLOY.md](DEPLOY.md).

## Estrutura

```
src/
  proxy.ts               Basic Auth opcional + reencaminha para /{locale}
  i18n.ts                idiomas + textos de interface fora do CMS
  app/(frontend)/
    [locale]/            layout, homepage, /services/[slug] e /equipment/[slug]
    actions.ts           server action do formulário de contacto
    styles.css           reset + custom properties globais
  app/(payload)/         admin e API do Payload
  collections/           Users, Media, Services, Equipment, ContactSubmissions
  globals/               Header, HomePage, ContactInfo, Footer
  components/
    layout/              SiteHeader, MobileNav, LocaleSwitcher, SiteFooter
    sections/            Hero, ServicesSection, AboutSection, EquipmentSection, ContactSection
    detail/              DetailIntro (topo partilhado por serviços e equipamentos)
    services/            ServiceGallery, GalleryLightbox (página de serviço)
    equipment/           EquipmentGallery (página de equipamento)
    SectionSeam.tsx      título de secção na costura, com o risco que sangra à direita
    MediaImage.tsx       wrapper de next/image para documentos `media`
  seed/                  conteúdo inicial (pt + en) + imagens exportadas do Figma
public/figma/            logótipo, textura do cabeçalho, cunhas decorativas e a foto do hero
```

## Modelo de conteúdo

| Onde                 | O quê                                                                          |
| -------------------- | ------------------------------------------------------------------------------ |
| Global **Header**    | itens de navegação                                                             |
| Global **Homepage**  | hero (imagem + assinatura), etiquetas das secções, blocos "Quem Somos"         |
| Global **Contactos** | mapa, moradas, e-mail geral, WhatsApp, etiquetas do formulário                 |
| Global **Rodapé**    | copyright e redes sociais                                                      |
| Coleção **Serviços** | os 10 cards da grelha, mais a introdução e a galeria da página de cada serviço |

Cada linha da **Galeria** de um serviço tem imagem, _Cliente_, _Localização_ e _Descrição_. A imagem abre
numa janela com essa ficha; as linhas sem texto não aparecem. _Localização_ e _Descrição_ são traduzíveis,
_Cliente_ não (é um nome próprio).
| Coleção **Equipamentos** | os 5 cards de máquinas, mais a introdução e as fotografias da página de cada uma |
| Coleção **Mensagens** | submissões do formulário "Fale connosco" (leitura só para autenticados) |

O seed escreve os dois idiomas e é idempotente.

## URLs

Os caminhos são todos em inglês, iguais nos dois idiomas — só muda o prefixo:

| Página      | Caminho                                                              |
| ----------- | -------------------------------------------------------------------- |
| Homepage    | `/{locale}`                                                          |
| Serviço     | `/{locale}/services/{slug}` — ex.: `/pt/services/tube-laser-cutting` |
| Equipamento | `/{locale}/equipment/{slug}` — ex.: `/pt/equipment/trulaser-1030`    |

As âncoras da homepage seguem a mesma regra: `#services`, `#about`, `#equipment`, `#contact`.
O `slug` é partilhado pelos dois idiomas; para o traduzir, marque-o `localized: true` em
`src/collections/Services.ts`.

## Idiomas

O site é bilingue: **`pt`** (por omissão) e **`en`**.

- **Payload** — `localization` em `src/payload.config.ts`, com `fallback: true`: uma tradução por
  preencher cai para o português em vez de aparecer vazia. Só os campos de texto estão marcados
  `localized: true`; a estrutura (ordem, imagens, `slug`, telefones, moradas) é partilhada pelos dois
  idiomas. No admin troca-se de idioma no selector do topo.
- **Rotas** — tudo sob `/{locale}`: `src/app/(frontend)/[locale]/`. O
  [proxy](src/proxy.ts) reencaminha os caminhos sem prefixo para o idioma do `Accept-Language`
  do browser, ou para `pt`; `/admin`, `/api` e os ficheiros com extensão seguem sem prefixo. O
  mesmo ficheiro trata do Basic Auth opcional, e por isso corre também sobre `/admin` e `/api` —
  fora do seu alcance ficam só os estáticos do Next, o optimizador de imagem e `/api/media/file`,
  que o optimizador vai buscar à própria origem sem credenciais.
- **Textos de interface** que não vivem no CMS (rótulos de acessibilidade, mensagens do formulário)
  estão em [src/i18n.ts](src/i18n.ts). A server action do formulário devolve um **código** de erro, não
  texto — a tradução é escolhida no cliente.

Cuidado ao escrever traduções por código: quando um campo `localized` vive dentro de um array
partilhado (`navItems`, `tagline`, `aboutBlocks`, `locations`), a escrita do segundo idioma tem de
reutilizar os `id` das linhas — caso contrário o Payload recria-as e apaga o texto do primeiro idioma.
O [seed](src/seed/index.ts) faz isso lendo a versão `pt` antes de escrever a `en`.

## Títulos de secção

No Figma cada título assenta **no fim da secção anterior**, por cima da cunha decorativa desse canto, e o
risco de 2px corre sobre a linha de base do texto até sangrar na margem direita (a cedilha de "SERVIÇOS"
atravessa-o). Por isso cada secção recebe `seamLabel` — o título da secção **seguinte** — e rende-o com
`<SectionSeam>`; a âncora (`#services`, `#about`, …) vive nesse título, não na secção. Consequência
prática: nenhuma secção pode ter `overflow: hidden`; quem precisa de recortar (fotografia, degradé, cunha)
fá-lo numa camada interior própria.

| Título                              | Fica no fim de | Cor     |
| ----------------------------------- | -------------- | ------- |
| SERVIÇOS (com a assinatura ao lado) | Hero           | `ash`   |
| QUEM SOMOS                          | Serviços       | `ink`   |
| EQUIPAMENTOS                        | Quem Somos     | `white` |
| CONTACTOS                           | Equipamentos   | `ink`   |

## Estilos

CSS Modules — cada componente tem o seu `Nome.module.css` ao lado do `.tsx`. Não há Tailwind nem
framework de CSS: `src/app/(frontend)/styles.css` traz apenas o reset e os custom properties globais.

Tokens em `:root`:

`gold #ad911b` · `yellow #d9c558` · `ink #2a2a2a` · `slate #58595b` · `ash #999999` ·
`footer #292e34` · `whatsapp #309c59`. Tipografia: Inter, via `next/font/google`.

As fotografias em `src/seed/assets` são carregadas com o caminho no nome
(`equipment/trubend-7050/01.jpg` → `equipment-trubend-7050-01.jpg`): várias pastas têm ficheiros
com o mesmo nome e o Payload procura-os pelo nome do ficheiro.

## Por fazer

- A navegação do cabeçalho passou a ter _Portfólio_. Os caminhos internos ficam guardados sem idioma
  (`/portfolio`) e o cabeçalho prefixa-os em `navHref`; o item só aparece depois de correr o seed.
- Falta a introdução de _Quinagem de Chapa_: no desenho aquela página repete, palavra por palavra, o
  texto do corte laser de chapa, por isso ficou sem introdução em vez de anunciar o serviço errado.
- Faltam as descrições das três últimas fotografias de _Tratamento de superfícies externo_ (os ficheiros
  vindos do WhatsApp) — no desenho a descrição é `???`. As linhas Cliente/Localização/Descrição aparecem
  na mesma, com a descrição vazia.

As dez páginas de serviço já têm galeria: _Corte Laser de Tubo_ (9 fotos), _Corte Laser de Chapa_ (15),
_Quinagem de Chapa_ (42), _Soldadura Laser_ (99), _Serralharias em ferro_ (96), _Aço Inox_ (21),
_Alumínio_ (9), _Aço Corten_ (6), _Tratamento de superfícies interno_ (72) e _externo_ (45). As galerias
grandes vivem em ficheiros próprios (`src/seed/content.<slug>.ts` + `.en.ts`) e são registadas no mapa
`bigGalleries` de `src/seed/index.ts`.

- Preencher _Cliente_ e _Localização_ das fotografias — o seed só traz a descrição de cada trabalho e o
  "Por confirmar" que vem do desenho.
- Envio de e-mail na submissão do formulário (hoje a mensagem só fica gravada no admin).

# Pôr o site online sem custos

Versão de demonstração, com URL pública fechada por palavra-passe, para o cliente
explorar o site e o admin. Três serviços, todos em plano gratuito:

| Peça               | Serviço                  | Porquê                                                          |
| ------------------ | ------------------------ | --------------------------------------------------------------- |
| Aplicação          | Vercel (Hobby)           | Constrói a partir de um repositório privado                      |
| Base de dados      | Turso (libSQL)           | Mantém o `sqliteAdapter` — não há migração para Postgres         |
| Media              | Vercel Blob              | O disco da Vercel é efémero e só de leitura                      |

O código fica privado: o repositório é privado e só os bundles de cliente
(minificados, sem source maps em produção) chegam ao browser. A configuração do
Payload, as server actions e a base de dados ficam do lado do servidor.

## 1. Repositório privado

```bash
git init
git add .
git commit -m "Site Mecanitor"
gh repo create mecanitor --private --source=. --push
```

`.env`, `mecanitor.db` e `./media` estão no `.gitignore` e não sobem. As imagens
do seed (`src/seed/assets`, ~81 MB) sobem — é delas que a media é reconstruída.

## 2. Base de dados no Turso

Em <https://turso.tech>, criar uma base de dados e guardar as duas credenciais:

- **URL** — `libsql://<nome>-<conta>.<região>.turso.io`
- **Token** — gerado em _Create Token_

**A região importa mais do que parece.** O Payload faz vários SELECT em série
para desenhar uma página, e cada um paga a latência inteira até à base de dados.
Com a base no Japão e as funções na Europa, uma página passa a demorar segundos.
Escolher uma região europeia — Frankfurt ou Irlanda — e mantê-la alinhada com a
região das funções da Vercel, que o `vercel.json` fixa em `fra1`.

A região de uma base de dados não se muda depois de criada: se estiver errada,
apaga-se e cria-se outra. Antes do seed isso não custa nada; depois obriga a
carregar os 60 MB de media outra vez.

## 3. Blob store na Vercel

No projeto Vercel, separador _Storage_ → _Create_ → _Blob_. A Vercel injecta
`BLOB_READ_WRITE_TOKEN` nos deploys sozinha; copie-o na mesma, é preciso no
passo 5.

## 4. Variáveis de ambiente na Vercel

_Settings_ → _Environment Variables_, em **todos** os ambientes:

| Variável                 | Valor                                                    |
| ------------------------ | -------------------------------------------------------- |
| `DATABASE_URI`           | `libsql://…turso.io`                                      |
| `DATABASE_AUTH_TOKEN`    | token do Turso                                            |
| `PAYLOAD_SECRET`         | segredo novo, longo e aleatório                           |
| `NEXT_PUBLIC_SERVER_URL` | `https://<projeto>.vercel.app`                            |
| `PREVIEW_USER`           | utilizador do Basic Auth a dar ao cliente                 |
| `PREVIEW_PASSWORD`       | palavra-passe do Basic Auth                               |

`BLOB_READ_WRITE_TOKEN` já lá está, posto pelo passo 3.

Sem `PREVIEW_USER`/`PREVIEW_PASSWORD` o portão desliga-se e o site fica aberto —
é isso que se quer no dia em que passar a público.

## 5. Semear o Turso e o Blob a partir do portátil

O `pnpm seed` cria o esquema (o Payload faz *push* sempre que `NODE_ENV` não é
`production`), carrega o conteúdo pt + en e envia as imagens para o Blob. Correr
uma vez, com as credenciais de produção passadas à frente do comando para não
mexer no `.env` local:

```powershell
$env:DATABASE_URI="libsql://…turso.io"
$env:DATABASE_AUTH_TOKEN="…"
$env:BLOB_READ_WRITE_TOKEN="vercel_blob_rw_…"
$env:PAYLOAD_SECRET="…"          # o mesmo que está na Vercel
pnpm seed
```

Fechar a consola a seguir: as variáveis só valem para aquela sessão e não devem
ficar a apontar à produção enquanto se desenvolve.

O seed é idempotente — voltar a correr não duplica nada. É também assim que se
empurram alterações ao esquema (campos novos numa coleção) para o Turso, já que
em produção o Payload não faz *push*.

## 6. Deploy

_Import Project_ na Vercel a apontar ao repositório. Não é preciso configurar
build: o `next build` e o pnpm são detectados pelo lockfile, e o `sharp` compila
porque `pnpm-workspace.yaml` o autoriza em `onlyBuiltDependencies`.

## 7. Entregar ao cliente

1. URL, utilizador e palavra-passe do Basic Auth (passo 4).
2. Depois disso, `/admin` com um utilizador do Payload — por omissão o seed cria
   `admin@mecanitor.com` / `mecanitor`, que deve ser mudado antes de entregar
   (`SEED_ADMIN_EMAIL` e `SEED_ADMIN_PASSWORD`, ou pelo próprio admin).

São dois portões distintos: o Basic Auth cobre o site inteiro, o login do Payload
só o admin. Enquanto o Basic Auth estiver de pé, as respostas levam
`X-Robots-Tag: noindex, nofollow`.

## Limites deste alojamento

- **Anexos do formulário**: uma função serverless da Vercel recusa corpos acima
  de 4,5 MB antes de o código correr. Por isso o formulário aceita 5 ficheiros,
  3 MB cada e 4 MB no total (`src/app/(frontend)/actions.ts`). Num alojamento
  sem esse tecto os limites podem voltar a subir.
- **Plano Hobby**: os termos da Vercel reservam-no para uso não comercial. Para
  um site de cliente a sério, ou se passa ao plano pago, ou muda-se de
  alojamento — o Render tem plano gratuito para uso comercial, mas adormece ao
  fim de 15 minutos sem tráfego e o primeiro pedido a seguir demora cerca de um
  minuto. O Turso e o Blob ficam iguais nos dois casos.
- **Blob**: ~60 MB de media contra ~1 GB de plano gratuito. Folga suficiente.

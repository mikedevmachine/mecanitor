/**
 * Galeria da página "Serralharias em aço corten" (frame 61:361 do Figma). Cada
 * entrada vem de uma das janelas de detalhe — frames 319 a 324 — pela ordem da
 * grelha; os pares foram confirmados pela fotografia de cada janela.
 *
 * A descrição da última entrada começava por "IIntervenção" no desenho.
 */

import type { LaserWeldingPhoto } from './content.laser-welding'

export const cortenGalleryPt: LaserWeldingPhoto[] = [
  {
    file: 'services/corten-steel-metalwork/001.jpg',
    client: 'GLEBA',
    location: 'lisboa',
    description:
      'Elemento de sinalética em aço Corten, produzido por corte laser e conformação de chapa.',
  },
  {
    file: 'services/corten-steel-metalwork/002.jpg',
    client: 'Câmara Municipal da Amadora (Parque da Liberdade)',
    location: 'Amadora',
    description:
      'Painel de sinalética em aço Corten, com recortes gráficos e letreiro executados por corte laser.',
  },
  {
    file: 'services/corten-steel-metalwork/003.jpg',
    client: 'Por confirmar',
    location: '',
    description:
      'Floreira longitudinal em aço Corten com construção soldada e acabamento por oxidação natural.',
  },
  {
    file: 'services/corten-steel-metalwork/004.jpg',
    client: 'Câmara Municipal da Amadora',
    location: 'Amadora',
    description: 'Marco urbano em aço Corten com lettering tridimensional “AMADORA”.',
  },
  {
    file: 'services/corten-steel-metalwork/005.jpg',
    client: 'Câmara Municipal da Amadora',
    location: 'Amadora',
    description:
      'Conjunto de sinalética urbana em aço Corten e letras metálicas “amadora”, integrado em espaço ajardinado.',
  },
  {
    file: 'services/corten-steel-metalwork/006.jpg',
    client: 'Câmara Municipal da Amadora',
    location: 'Amadora',
    description:
      'Intervenção urbana em aço Corten integrando revestimentos, pórtico escultórico e lettering.',
  },
]

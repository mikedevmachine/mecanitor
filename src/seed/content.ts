/**
 * Conteúdo da homepage, transcrito do ficheiro Figma "Site Mecanitor" (node 1:2).
 * Serve de base ao `pnpm seed`; depois disso a fonte de verdade passa a ser o Payload.
 */

export type SeedParagraph = string

export const services: {
  title: string
  titleSecondLine?: string
  slug: string
  file: string
  alt: string
  intro?: string
  gallery?: {
    file: string
    alt: string
    client?: string
    location?: string
    description?: string
  }[]
}[] = [
  {
    title: 'Corte Laser',
    titleSecondLine: 'de Tubo',
    slug: 'tube-laser-cutting',
    file: 'services/corte-laser-tubo.jpg',
    alt: 'Estrutura metálica com tubo cortado a laser',
    intro:
      'O nosso sistema de corte laser para tubos e perfis permite furações, encaixes e chanfros de alta complexidade numa só operação. Eliminamos ajustamentos manuais e otimizamos a montagem final, garantindo uniões perfeitas e uma estética limpa em qualquer estrutura.',
    gallery: [
      {
        file: 'services/tube-laser-cutting/01.jpg',
        alt: 'Garrafeira suspensa em tubo de aço',
        client: 'Por confirmar',
        description: 'Estrutura metálica suspensa para integração sobre balcão.',
      },
      {
        file: 'services/tube-laser-cutting/02.jpg',
        alt: 'Guarda de varanda em tubo de aço',
        description: 'Guarda de varanda em tubo de aço com prumos verticais.',
      },
      {
        file: 'services/tube-laser-cutting/03.jpg',
        alt: 'Corrimão curvo em tubo de aço inoxidável',
        description: 'Corrimão curvo em tubo de aço inoxidável sobre escada exterior.',
      },
      {
        file: 'services/tube-laser-cutting/04.jpg',
        alt: 'Guarda-corpos de rampa em tubo de aço',
        description: 'Guarda-corpos de rampa de acesso em tubo de aço.',
      },
      {
        file: 'services/tube-laser-cutting/05.jpg',
        alt: 'Estrutura de pérgola em tubo de aço',
        description: 'Estrutura de pérgola em tubo de aço para espaço exterior.',
      },
      {
        file: 'services/tube-laser-cutting/06.jpg',
        alt: 'Cobertura metálica sobre espelho de água',
        description: 'Cobertura metálica sobre espelho de água.',
      },
      {
        file: 'services/tube-laser-cutting/07.jpg',
        alt: 'Peças em tubo curvado em fabrico',
        description: 'Peças em tubo curvado, em fase de fabrico na oficina.',
      },
      {
        file: 'services/tube-laser-cutting/08.jpg',
        alt: 'Guardas de varanda em moradia',
        description: 'Guardas de varanda e portão em moradia unifamiliar.',
      },
      {
        file: 'services/tube-laser-cutting/09.jpg',
        alt: 'Gradeamento exterior em tubo de aço',
        description: 'Gradeamento exterior em tubo de aço ao longo de muro curvo.',
      },
    ],
  },
  {
    title: 'Corte Laser',
    titleSecondLine: 'de Chapa',
    slug: 'sheet-laser-cutting',
    file: 'services/corte-laser-chapa.jpg',
    alt: 'Painel decorativo em chapa cortada a laser',
    intro:
      'Utilizando tecnologia de corte laser de última geração, transformamos chapas metálicas com velocidade, repetibilidade e tolerâncias extremamente reduzidas. Garantimos arestas limpas, sem deformações térmicas, preparadas para montagens de alta precisão.',
    gallery: [
      {
        file: 'services/sheet-laser-cutting/01.jpg',
        alt: 'Sinalética em chapa preta com letras vazadas a laser, retroiluminada',
        client: 'Cinema São Jorge',
        location: 'Lisboa',
        description:
          'Sinalética em chapa ZinCor, com recorte laser e acabamento termolacado, formando letras vazadas.',
      },
      {
        file: 'services/sheet-laser-cutting/02.jpg',
        alt: 'Painel em chapa cortada a laser com padrão geométrico e lettering',
        client: 'Cartier',
        location: 'Lisboa',
        description:
          'Painel metálico decorativo instalado com padrão geométrico repetitivo e lettering aplicado.',
      },
      {
        file: 'services/sheet-laser-cutting/03.jpg',
        alt: 'Balcão de bar com painéis perfurados e letreiro luminoso',
        client: 'Chef José Avillez — MiniBar',
        location: 'Lisboa',
        description:
          'Balcão e frente de bar com serralharia decorativa preta, painéis perfurados e lettering luminoso.',
      },
      {
        file: 'services/sheet-laser-cutting/04.jpg',
        alt: 'Sinalética luminosa e bandeirola metálica na entrada do restaurante',
        client: 'Chef José Avillez — Bairro do Avillez',
        location: 'Lisboa',
        description:
          'Sinalética e serralharia decorativa com elementos metálicos recortados, caixas luminosas e suportes integrados.',
      },
      {
        file: 'services/sheet-laser-cutting/05.jpg',
        alt: 'Estrutura metálica com tela azul sobre fachada revestida a chapa',
        client: 'Fitness Hut',
        location: 'Lisboa',
        description: 'Estrutura metálica com suportes e elementos complementares junto à fachada.',
      },
      {
        file: 'services/sheet-laser-cutting/06.jpg',
        alt: 'Painéis em chapa com letras “amadora” recortadas, em jardim urbano',
        client: 'Câmara Municipal da Amadora',
        location: 'Amadora',
        description:
          'Conjunto de sinalética urbana em aço Corten e letras metálicas “amadora”, integrado em espaço ajardinado.',
      },
      {
        file: 'services/sheet-laser-cutting/07.jpg',
        alt: 'Escada interior em aço com degraus em chapa e guardas em rede metálica',
        client: 'Por confirmar',
        description:
          'Escada metálica interior com degraus em chapa perfurada e estrutura lateral em aço.',
      },
      {
        file: 'services/sheet-laser-cutting/08.jpg',
        alt: 'Letreiro com letras metálicas tridimensionais em fachada de clínica',
        client: 'Por confirmar',
        description:
          'Letreiro tridimensional composto por letras e símbolos metálicos de grande formato.',
      },
      {
        file: 'services/sheet-laser-cutting/09.jpg',
        alt: 'Totem de sinalética exterior em caixas metálicas pintadas de azul',
        client: 'Instituto Politécnico de Lisboa — Campus de Benfica',
        location: 'Lisboa',
        description:
          'Totem de sinalética exterior composto por caixas metálicas de grande formato, estrutura de suporte e acabamento pintado.',
      },
      {
        file: 'services/sheet-laser-cutting/10.jpg',
        alt: 'Letreiro urbano “amadora” em letras tridimensionais de chapa de inox',
        client: 'Câmara Municipal da Amadora',
        location: 'Amadora',
        description:
          'Letreiro urbano de grande formato com lettering tridimensional, executado em estrutura metálica para instalação exterior.',
      },
      {
        file: 'services/sheet-laser-cutting/11.jpg',
        alt: 'Revestimento curvo em chapa dourada com sanca perfurada',
        client: 'La Brasserie de l’Entrecôte',
        location: 'Lisboa',
        description:
          'Revestimento metálico curvo em acabamento dourado, integrando chapa perfurada, nervuras estruturais e iluminação linear.',
      },
      {
        file: 'services/sheet-laser-cutting/12.jpg',
        alt: 'Instalação de painel em chapa recortada a laser em vão arqueado',
        client: 'Por confirmar',
        description:
          'Painel decorativo metálico para vão arqueado com instalação sobre caixilharia existente.',
      },
      {
        file: 'services/sheet-laser-cutting/13.jpg',
        alt: 'Painel de sinalética em chapa de aço com letras cortadas a laser',
        client: 'GLEBA',
        location: 'Lisboa',
        description:
          'Elemento de sinalética em aço Corten, produzido por corte laser e conformação de chapa.',
      },
      {
        file: 'services/sheet-laser-cutting/14.jpg',
        alt: 'Escada revestida a chapa metálica com guarda lateral em aço pintado',
        client: 'JLL',
        location: 'Lisboa',
        description:
          'Escada revestida a chapa metálica, com guarda lateral maciça em aço pintado e remates em inox.',
      },
      {
        file: 'services/sheet-laser-cutting/15.jpg',
        alt: 'Letreiro e logótipo em chapa de aço inox recortada em fachada',
        client: 'Pavilhão Desportivo Escolar Municipal Rita Borralho',
        location: 'Amadora',
        description: 'Letreiro em chapa de aço inoxidável escovado recortada.',
      },
    ],
  },
  {
    title: 'Quinagem de Chapa',
    slug: 'sheet-metal-bending',
    file: 'services/quinagem-chapa.jpg',
    alt: 'Peça em chapa quinada',
    gallery: [
      {
        file: 'services/sheet-metal-bending/01.jpg',
        alt: 'Balcão de restaurante com revestimento de parede em painéis texturados',
        client: 'H3',
        location: 'Lisboa',
        description: 'Serralharia em aço inoxidável incluindo revestimento de parede em chapa.',
      },
      {
        file: 'services/sheet-metal-bending/02.jpg',
        alt: 'Placa de sinalética em chapa de aço com o nome GLEBA vazado',
        client: 'GLEBA',
        location: 'Lisboa',
        description:
          'Elemento de sinalética em aço Corten, produzido por corte laser e conformação de chapa.',
      },
      {
        file: 'services/sheet-metal-bending/03.jpg',
        alt: 'Escada metálica com degraus em chapa de aço sobre perfis pintados',
        client: 'Por confirmar',
        description: 'Escada metálica executada com perfis e degraus em chapa de aço.',
      },
      {
        file: 'services/sheet-metal-bending/04.jpg',
        alt: 'Expositor de padaria com estrutura metálica e painéis retroiluminados',
        client: 'GLEBA',
        location: 'Lisboa',
        description: 'Expositor em estrutura metálica galvanizada e lacada em tom cobre.',
      },
      {
        file: 'services/sheet-metal-bending/05.jpg',
        alt: 'Estrutura curva de escada em aço em montagem na oficina',
        client: 'Leão de Ouro',
        location: 'Lisboa',
        description:
          'Estrutura de escada curva, composta por chapas de aço calandradas e degraus soldados.',
      },
      {
        file: 'services/sheet-metal-bending/06.jpg',
        alt: 'Exaustor em aço inoxidável escovado suspenso sobre cozinha industrial',
        client: 'Smash StreetBurguer',
        location: 'Lisboa',
        description: 'Revestimento em aço inoxidável escovado aplicado sobre estrutura metálica.',
      },
      {
        file: 'services/sheet-metal-bending/07.jpg',
        alt: 'Escada helicoidal em aço com guarda em chapa curva junto à fachada',
        client: 'Hovione',
        location: 'Lisboa',
        description:
          'Escada helicoidal em aço calandrado e equipada com degraus em chapa folha de oliveira.',
      },
      {
        file: 'services/sheet-metal-bending/08.jpg',
        alt: 'Escada helicoidal revestida a chapa metálica polida em tom bronze',
        client: 'Fit Out TETRIS',
        location: 'Lisboa',
        description:
          'Escada helicoidal com revestimento metálico contínuo e acabamento arquitetónico escuro.',
      },
      {
        file: 'services/sheet-metal-bending/09.jpg',
        alt: 'Escada metálica interior vista de baixo, com estrutura lateral em aço',
        client: 'Por confirmar',
        description:
          'Escada metálica interior com degraus em chapa perfurada e estrutura lateral em aço.',
      },
      {
        file: 'services/sheet-metal-bending/10.jpg',
        alt: 'Técnicos a instalar remate metálico no topo do balcão de um bar',
        client: 'Por confirmar',
        description:
          'Estrutura e revestimentos metálicos em fase de montagem executados para zona de bar e restauração.',
      },
      {
        file: 'services/sheet-metal-bending/11.jpg',
        alt: 'Resguardo metálico de lâminas horizontais com tampo ranhurado',
        client: 'Por confirmar',
        description:
          'Envolvente metálica ventilada composta por lâminas horizontais e perfis de suporte como resguardo técnico e permitindo circulação de ar.',
      },
      {
        file: 'services/sheet-metal-bending/12.jpg',
        alt: 'Escada metálica com degraus em balanço sobre viga central',
        client: 'Por confirmar',
        description:
          'Escada metálica interior, com degraus em balanço apoiados numa estrutura central.',
      },
      {
        file: 'services/sheet-metal-bending/13.jpg',
        alt: 'Balcão com estrutura metálica, painéis de vidro e iluminação embutida',
        client: 'Por confirmar',
        description:
          'Balcão de atendimento executado com estrutura metálica, tampos e painéis integrados.',
      },
      {
        file: 'services/sheet-metal-bending/14.jpg',
        alt: 'Escada helicoidal em aço dentro de cilindro de malha metálica',
        client: 'Por confirmar',
        description:
          'Escada helicoidal interior em aço, envolvida por estrutura cilíndrica de malha metálica.',
      },
      {
        file: 'services/sheet-metal-bending/15.jpg',
        alt: 'Teto de lâminas metálicas em escritório com fachada envidraçada',
        client: 'Por confirmar',
        description:
          'Sistema de lâminas metálicas instalado em teto para integração de iluminação.',
      },
      {
        file: 'services/sheet-metal-bending/16.jpg',
        alt: 'Balcão de quiosque em painéis azuis lacados com pilares brancos',
        client: 'Por confirmar',
        description:
          'Quiosque interior com estrutura metálica, painéis lacados, iluminação integrada e balcões de atendimento.',
      },
      {
        file: 'services/sheet-metal-bending/17.jpg',
        alt: 'Floreira longitudinal em aço Corten junto a esplanada de restaurante',
        client: 'Por confirmar',
        description:
          'Floreira longitudinal em aço Corten com construção soldada e acabamento por oxidação natural.',
      },
      {
        file: 'services/sheet-metal-bending/18.jpg',
        alt: 'Marco urbano em chapa de aço Corten com letras AMADORA em relevo',
        client: 'Câmara Municipal da Amadora',
        location: 'Amadora',
        description: 'Marco urbano em aço Corten com lettering tridimensional “AMADORA”.',
      },
      {
        file: 'services/sheet-metal-bending/19.jpg',
        alt: 'Painéis metálicos com letras recortadas “amadora” em espaço ajardinado',
        client: 'Câmara Municipal da Amadora',
        location: 'Amadora',
        description:
          'Conjunto de sinalética urbana em aço Corten e letras metálicas “amadora”, integrado em espaço ajardinado.',
      },
      {
        file: 'services/sheet-metal-bending/20.jpg',
        alt: 'Portão de duas folhas com lâminas inclinadas sobre chapa perfurada',
        client: 'Por confirmar',
        description: 'Portão metálico com caixilho soldado e enchimento de lâminas inclinadas.',
      },
      {
        file: 'services/sheet-metal-bending/21.jpg',
        alt: 'Revestimento metálico curvo dourado com chapa perfurada no teto',
        client: 'La Brasserie de l’Entrecôte',
        location: 'Lisboa',
        description:
          'Revestimento metálico curvo em acabamento dourado, integrando chapa perfurada, nervuras estruturais e iluminação linear.',
      },
      {
        file: 'services/sheet-metal-bending/22.jpg',
        alt: 'Escada exterior em aço com lanços em ziguezague e patamares curvos',
        client: 'Por confirmar',
        description: 'Escadas metálicas com lanços independentes, patamares e guardas em aço.',
      },
      {
        file: 'services/sheet-metal-bending/23.jpg',
        alt: 'Passagem inferior revestida a aço Corten com pórtico e lettering',
        client: 'Câmara Municipal da Amadora',
        location: 'Amadora',
        description:
          'Intervenção urbana em aço Corten integrando revestimentos, pórtico escultórico e lettering.',
      },
      {
        file: 'services/sheet-metal-bending/24.jpg',
        alt: 'Escada helicoidal em aço com chapa exterior curva e degraus metálicos',
        client: 'Por confirmar',
        description:
          'Escada helicoidal interior em aço, com estrutura curva contínua e degraus metálicos.',
      },
      {
        file: 'services/sheet-metal-bending/25.jpg',
        alt: 'Marco de sinalização urbana em chapa metálica com logótipo aplicado',
        client: 'Câmara Municipal da Amadora',
        location: 'Amadora',
        description:
          'Marco de sinalização urbana, composto por chapa metálica conformada e elementos gráficos aplicados.',
      },
      {
        file: 'services/sheet-metal-bending/26.jpg',
        alt: 'Letras tridimensionais «amadora» em chapa metálica polida sobre relva',
        client: 'Câmara Municipal da Amadora',
        location: 'Amadora',
        description:
          'Letreiro urbano de grande formato com lettering tridimensional, executado em estrutura metálica para instalação exterior.',
      },
      {
        file: 'services/sheet-metal-bending/27.jpg',
        alt: 'Balcão de bar com painéis perfurados e letreiro luminoso',
        client: 'Chef José Avillez — MiniBar',
        location: 'Lisboa',
        description:
          'Balcão e frente de bar com serralharia decorativa preta, painéis perfurados e lettering luminoso.',
      },
      {
        file: 'services/sheet-metal-bending/28.jpg',
        alt: 'Estrutura metálica suspensa com letreiro Taberna e presuntos',
        client: 'Chef José Avillez — Bairro do Avillez (by Detailsmind)',
        description:
          'Estrutura metálica suspensa para zona “Taberna”, utilizada no suporte de iluminação, elementos decorativos e produtos, combinando funcionalidade de serviço com forte expressão cenográfica.',
      },
      {
        file: 'services/sheet-metal-bending/29.jpg',
        alt: 'Letreiro luminoso em arco e caixas de menu na fachada do restaurante',
        client: 'Chef José Avillez — Bairro do Avillez',
        location: 'Lisboa',
        description:
          'Sinalética e serralharia decorativa com elementos metálicos recortados, caixas luminosas e suportes integrados.',
      },
      {
        file: 'services/sheet-metal-bending/30.jpg',
        alt: 'Portão de duas folhas em chapa metálica com vão guarnecido a chapa',
        client: 'Palacete Villhena',
        location: 'Lisboa',
        description:
          'Portão metálico de 2 folhas com folhas opacas e estrutura reforçada, guarnecimento perimetral de vão em chapa de ferro.',
      },
      {
        file: 'services/sheet-metal-bending/31.jpg',
        alt: 'Escada revestida a chapa metálica com guarda maciça em aço pintado',
        client: 'JLL',
        location: 'Lisboa',
        description:
          'Escada revestida a chapa metálica, com guarda lateral maciça em aço pintado e remates em inox.',
      },
      {
        file: 'services/sheet-metal-bending/32.jpg',
        alt: 'Portão de correr em painéis metálicos cinzentos junto a muro branco',
        client: 'Rua do Passadiço',
        location: 'Lisboa',
        description:
          'Portão metálico de correr em painéis opacos, com estrutura reforçada e acabamento cinzento, preparado para automatização.',
      },
      {
        file: 'services/sheet-metal-bending/33.jpg',
        alt: 'Armário técnico em chapa metálica com portas e grelhas de ventilação',
        client: 'Moradia particular',
        description:
          'Armário técnico em chapa metálica, com portas, grelhas de ventilação e fechaduras integradas.',
      },
      {
        file: 'services/sheet-metal-bending/34.jpg',
        alt: 'Letras metálicas tridimensionais na fachada de uma clínica',
        client: 'Por confirmar',
        description:
          'Letreiro tridimensional composto por letras e símbolos metálicos de grande formato.',
      },
      {
        file: 'services/sheet-metal-bending/35.jpg',
        alt: 'Sinalética exterior em caixas metálicas azuis sobre um muro',
        client: 'Instituto Politécnico de Lisboa — Campus de Benfica',
        location: 'Lisboa',
        description:
          'Totem de sinalética exterior composto por caixas metálicas de grande formato, estrutura de suporte e acabamento pintado.',
      },
      {
        file: 'services/sheet-metal-bending/36.jpg',
        alt: 'Invólucro técnico em chapa quinada lacada sobre pedestal embalado',
        client: 'Por confirmar',
        description:
          'Conjunto de invólucros técnicos e pedestais em chapa metálica quinada e lacada.',
      },
      {
        file: 'services/sheet-metal-bending/37.jpg',
        alt: 'Cúpula revestida a escamas de chapa sobre armação radial em aço',
        client: 'Chef José Avillez — Bairro do Avillez',
        location: 'Lisboa',
        description:
          'Estrutura constituída por armação radial metálica e cúpula revestida por pequenas chapas sobrepostas com construção tridimensional.',
      },
      {
        file: 'services/sheet-metal-bending/38.jpg',
        alt: 'Portas de correr em chapa metálica com grelhas de ventilação',
        client: 'Santogal Mercedes',
        location: 'Sintra',
        description:
          'Vão de correr para acesso às oficinas, integrando duas portas retangulares de correr e grelhas de respiração.',
      },
      {
        file: 'services/sheet-metal-bending/39.jpg',
        alt: 'Pavimento de oficina com tampas e chapas antiderrapantes embutidas',
        client: 'Por confirmar',
        description:
          'Elementos metálicos integrados incluindo tampas e chapas antiderrapantes de acesso técnico.',
      },
      {
        file: 'services/sheet-metal-bending/40.jpg',
        alt: 'Cobertura azul sobre estrutura metálica na fachada de um ginásio',
        client: 'Fitness Hut',
        location: 'Lisboa',
        description: 'Estrutura metálica com suportes e elementos complementares junto à fachada.',
      },
      {
        file: 'services/sheet-metal-bending/41.jpg',
        alt: 'Pala de entrada em perfis de aço sobre fachada envidraçada',
        client: 'Por confirmar',
        description: 'Pala metálica de entrada com estrutura retangular em perfis de aço.',
      },
      {
        file: 'services/sheet-metal-bending/42.jpg',
        alt: 'Painel de entrada com número 17 e números de piso em baixo relevo',
        client: 'Av. da República 17',
        description:
          'Painel em alumínio com números de piso fresado em baixo relevo com acabamento termolacado.',
      },
    ],
  },
  {
    title: 'Soldadura Laser',
    slug: 'laser-welding',
    file: 'services/soldadura-laser.jpg',
    alt: 'Trabalho de soldadura laser em metal',
    intro:
      'Representando o topo da tecnologia de união metálica, a soldadura laser proporciona cordões extremamente finos, profundos e de resistência superior. Com uma utilização térmica mínima, preservamos a integridade e estética do material, eliminando deformações mesmo em peças delicadas.',
  },
  {
    title: 'Serralharias',
    titleSecondLine: 'em ferro',
    slug: 'iron-metalwork',
    file: 'services/serralharias-ferro.jpg',
    alt: 'Serralharia em ferro',
    intro:
      'Executamos todo o tipo de trabalhos em ferro dispondo para isso de maquinaria e mão-de-obra especializada. Transformamos o ferro na espinha dorsal de projetos arquitetónicos e industriais marcantes. Combinando o rigor da engenharia com as mais avançadas técnicas neste tipo de trabalho, criamos desde estruturas pesadas de elevada capacidade de carga a elementos decorativos com acabamentos finos de alta durabilidade.',
  },
  {
    title: 'Serralharias em',
    titleSecondLine: 'Aço Inox',
    slug: 'stainless-steel-metalwork',
    file: 'services/serralharias-aco-inox.jpg',
    alt: 'Serralharia em aço inoxidável',
    intro:
      'Atualmente, a nossa empresa está equipada com equipamentos e meios que respondem aos mais altos padrões de exigência e qualidade, com instalações exclusivas para este tipo de trabalho, nomeadamente para ambientes de alta exigência higiénica, arquitetura moderna e espaços de luxo. Sendo a responsabilidade ecológica uma das filosofias basilares da atividade da Mecanitor, a utilização de materiais como o aço inoxidável vai ao encontro das regras para um desenvolvimento sustentável.',
  },
  {
    title: 'Serralharias',
    titleSecondLine: 'em Alumínio',
    slug: 'aluminium-metalwork',
    file: 'services/serralharias-aluminio.jpg',
    alt: 'Serralharia em alumínio',
    intro:
      'Para projetos que exigem elevada resistência estrutural aliada à otimização de peso, as nossas soluções em alumínio oferecem a combinação perfeita. Trabalhamos com perfis e chapas de alta precisão para aplicações arquitetónicas e industriais de linhas para resultados funcionais e esteticamente satisfatórios.',
  },
  {
    title: 'Serralharias',
    titleSecondLine: 'em aço corten',
    slug: 'corten-steel-metalwork',
    file: 'services/serralharias-aco-corten.jpg',
    alt: 'Serralharia em aço corten',
    intro:
      'O aço corten é a fusão ideal entre a força do metal e a beleza orgânica do tempo. Desenvolvemos peças e revestimentos exclusivos onde a camada protetora de oxidação natural confere uma identidade única, resistência excecional e uma presença marcante na arquitetura e no design de exterior.',
  },
  {
    title: 'Tratamento de',
    titleSecondLine: 'superfícies interno',
    slug: 'indoor-surface-treatment',
    file: 'services/tratamento-superficies-interno.jpg',
    alt: 'Tratamento de superfícies em interiores',
    intro:
      'Garantimos que cada peça está preparada para enfrentar os ambientes mais agressivos. Aplicamos processos rigorosos de preparação e tratamento de superfície que asseguram a máxima aderência, imunidade à corrosão e uma base perfeita para o acabamento final.',
  },
  {
    title: 'Tratamento de',
    titleSecondLine: 'superfícies externo',
    slug: 'outdoor-surface-treatment',
    file: 'services/tratamento-superficies-externo.jpg',
    alt: 'Tratamento de superfícies em exteriores',
    intro:
      'Garantimos que cada peça está preparada para enfrentar os ambientes mais agressivos. Aplicamos processos rigorosos de preparação e tratamento de superfície que asseguram a máxima aderência, imunidade à corrosão e uma base perfeita para o acabamento final.',
  },
]

export const equipment: {
  category: string
  model: string
  slug: string
  file: string
  alt: string
}[] = [
  {
    category: 'Quinadora',
    model: 'Trumpf TruBend 7050',
    slug: 'trumpf-trubend-7050',
    file: 'equipment/trubend-7050.png',
    alt: 'Quinadora Trumpf TruBend 7050',
  },
  {
    category: 'Quinadora',
    model: 'Trumpf TruBend 3170',
    slug: 'trumpf-trubend-3170',
    file: 'equipment/trubend-3170.png',
    alt: 'Quinadora Trumpf TruBend 3170',
  },
  {
    category: 'Soldadura Laser',
    model: 'IPG Lightweld XR 1500',
    slug: 'ipg-lightweld-xr-1500',
    file: 'equipment/ipg-lightweld-xr-1500.png',
    alt: 'Equipamento de soldadura laser IPG Lightweld XR 1500',
  },
  {
    category: 'Corte a Laser',
    model: 'TruLaser 1030',
    slug: 'trulaser-1030',
    file: 'equipment/trulaser-1030.png',
    alt: 'Máquina de corte a laser TruLaser 1030',
  },
  {
    category: 'Corte a Laser',
    model: 'TruLaser 5000',
    slug: 'trulaser-5000',
    file: 'equipment/trulaser-tube-5000.png',
    alt: 'Máquina de corte a laser de tubo TruLaser Tube 5000',
  },
]

export const aboutBlocks: {
  title: string
  paragraphs: SeedParagraph[]
  file: string
  alt: string
  imagePosition: 'left' | 'right'
  imageAspect: 'auto' | '5/4' | '1/1' | '3/4'
  showRule: boolean
}[] = [
  {
    title: 'A MECANITOR',
    imagePosition: 'right',
    imageAspect: '5/4',
    showRule: false,
    file: 'about/fachada.png',
    alt: 'Fachada metálica executada pela Mecanitor',
    paragraphs: [
      'Seja bem-vindo à Mecanitor online.',
      'Fundada em 1990, a Mecanitor tomou como linhas orientadoras do seu trabalho “servir funcionalidade e design”. Assumindo sempre um compromisso com o cliente, trabalhamos com profissionalismo e eficácia.',
      'Realizamos trabalhos de serralharia em Ferro e Inox, nomeadamente escadas, corrimãos, mobiliário urbano, e estruturas metálicas. Estamos situados na periferia de Lisboa, em Camarate, mas fazemos montagens em todo o país incluindo regiões autónomas. Além dos trabalhos nacionais, já exportámos para outros países como Espanha, Luxemburgo, Senegal ou Cabo Verde.',
      'Se procura um trabalho com qualidade ao melhor preço, contacte-nos.',
    ],
  },
  {
    title: 'MISSÃO SOCIAL',
    imagePosition: 'left',
    imageAspect: '1/1',
    showRule: true,
    file: 'about/missao-social.jpg',
    alt: 'Estrutura metálica montada pela equipa da Mecanitor',
    paragraphs: [
      'A Mecanitor actualmente emprega cerca de trinta funcionários, com tendência para um aumento gradual. Vencendo as adversidades, a empresa tem crescido não só na mão-de-obra, como na quantidade e qualidade dos serviços prestados. Isto deve-se à política de contratação, pois não recrutamos colaboradores baseados na sua idade ou experiência. Contamos com a experiência de quem trabalha neste ramo há largos anos, bem como jovens com formação profissional que pretendam integrar a nossa empresa. Inclusive, temos protocolos estabelecidos com centros de formação a fim de recebermos estagiários que procurem entrar no mercado de trabalho.',
      'Por outro lado, cientes dos problemas ambientais, reciclamos os excedentes de materiais ferrosos. Esta preocupação extende-se ao tratamento de superfícies, pela escolha da hidrodecapagem no lugar da decapagem por projecção de granalha de aço. Deste modo exercemos a nossa actividade com maior eficiência e minimizamos os inconvenientes a quem nos rodeia.',
    ],
  },
  {
    title: 'TRABALHO TEMPORÁRIO',
    imagePosition: 'left',
    imageAspect: '3/4',
    showRule: true,
    file: 'about/trabalho-temporario.jpg',
    alt: 'Equipa da Mecanitor em trabalho de manutenção',
    paragraphs: [
      'A experiência adquirida com o trabalho, permitiu à Mecanitor identificar outras áreas de negócio complementares que proporcionassem um alargamento das suas actividades. Assim, tornou-se viável a criação do serviço de manutenção. O seu principal objectivo é a fidelização de clientes, pois verifica-se muitas vezes que se perdia o contacto do cliente após a realização do trabalho. Com este serviço, também se passou a oferecer uma garantia aos trabalhos efectuados, o que também aumentava a confiança dos clientes. Como se pode ver, tudo concorre para estreitar laços com os nossos clientes, fidelizando-o aos serviços da Mecanitor.',
      'Entre muitas operações de manutenção, destacam-se, como mais frequentes, pequenas reparações tais como ajustamento de portões e substituição de fechaduras. Não obstante, existem competências que conferem às equipas a capacidade de resolução de problemas de grande porte.',
      'À semelhança do Serviço de Serralharia Civil, também o Serviço de Manutenção não apresenta quaisquer limitações geográficas para o desempenho das suas funções a Mecanitor pretende afirmar-se em todo país, bem como para além dele.',
    ],
  },
]

export const navItems = [
  { label: 'SERVIÇOS', href: '#services' },
  // Caminho sem idioma: o cabeçalho prefixa com o idioma em `navHref`.
  { label: 'PORTFÓLIO', href: '/portfolio' },
  { label: 'QUEM SOMOS', href: '#about' },
  { label: 'EQUIPAMENTOS', href: '#equipment' },
  { label: 'CONTACTOS', href: '#contact' },
]

export const tagline = [
  { text: 'Inspirados pelo ', emphasis: false },
  { text: 'Design', emphasis: true },
  { text: ', fabricamos ', emphasis: false },
  { text: 'funcionalidade', emphasis: true },
]

export const locations = [
  {
    name: 'Mecanitor Lda - Ferro',
    addressLines: [
      { line: 'Rua Principal Quinta do Azoguete Lote 67 S/N' },
      { line: 'Bairro de São José' },
      { line: '2680-174 Camarate' },
    ],
    phoneLabel: 'T •',
    phone: '219 471 745',
  },
  {
    name: 'Mecanitor Lda - Laser e Inox',
    addressLines: [
      { line: 'Rua Sol Nascente 7 - Armazém AA Centro Empresarial Quinta da Bela Vista,' },
      { line: '2660-009 Frielas' },
    ],
    phoneLabel: 'TM •',
    phone: '939 471 706',
  },
]

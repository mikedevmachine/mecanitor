/**
 * Conteúdo das páginas de equipamento, transcrito do Figma (frames 297:10140,
 * 309:10210, 309:10263, 359:4122 e 359:4177). As chaves são os `slug`.
 *
 * `intro` é uma lista de parágrafos; cada parágrafo é uma lista de troços, e um
 * troço com `bold` sai a peso médio, como no desenho.
 */

export type Run = string | { text: string; bold: true }

type EquipmentPage = {
  intro: Run[][]
  gallery: { file: string; alt: string }[]
}

export const equipmentPagesPt: Record<string, EquipmentPage> = {
  'trumpf-trubend-7050': {
    intro: [
      [
        'A TruBend Série 7000 é um exemplo perfeito da combinação perfeita entre o homem e a máquina: peças pequenas e médias são dobradas de forma bem econômica. Com economia de espaço para qualquer produção, a máquina ergonômica de alta velocidade dobra peças pequenas e médias sob as melhores condições de trabalho. Além da alta ergonomia e facilidade de operação, você atinge um alto resultado com uma ótima qualidade graças ao acionamento direto e ao nosso sistema de medição de ângulo automático. A operação sentado ou em pé é agradável para o operador e o processo de equipamento é extremamente rápido e seguro graças ao BendGuard.',
      ],
    ],
    gallery: [
      {
        file: 'equipment/trubend-7050/01.jpg',
        alt: 'Operador a dobrar uma peça em chapa na quinadora Trumpf TruBend 7050',
      },
      {
        file: 'equipment/trubend-7050/02.jpg',
        alt: 'Peça em chapa dobrada entre as ferramentas da TruBend 7050',
      },
    ],
  },
  'trumpf-trubend-3170': {
    intro: [
      [
        'Se todas as dobras do seu trabalho diário precisam ser perfeitas e os processos precisam funcionar de maneira estável com um escopo orçamentário limitado, você precisa de uma máquina que faça exatamente isso. A TruBend Série 3000 foi desenvolvida para apoiar você em seus desafios diários, mesmo se as peças dobradas forem complexas e exigentes. A máquina é versátil e confiável, com operação consistentemente estável. Você se beneficia de ângulos precisos, qualidade consistente de componentes e soluções que reduzem visivelmente a carga da sua produção.',
      ],
      ['Porque resultados grandes surgem em equipes pequenas.'],
    ],
    gallery: [
      {
        file: 'equipment/trubend-3170/01.jpg',
        alt: 'Zona de trabalho da quinadora Trumpf TruBend 3170',
      },
      {
        file: 'equipment/trubend-3170/02.jpg',
        alt: 'Ferramenta e esbarro traseiro da quinadora TruBend 3170',
      },
    ],
  },
  'ipg-lightweld-xr-1500': {
    intro: [
      [
        'Os sistemas portáteis de soldadura e limpeza a laser LightWELD foram concebidos para revolucionar a qualidade das suas soldaduras e a sua produtividade. A soldadura a laser LightWELD é rápida, fácil de aprender e produz resultados consistentes e de alta qualidade numa vasta gama de materiais e espessuras. A funcionalidade de limpeza a laser antes e depois da soldadura otimiza a qualidade da soldadura, aumentando simultaneamente a produtividade.',
      ],
    ],
    gallery: [
      {
        file: 'equipment/ipg-lightweld-xr-1500/01.jpg',
        alt: 'Sistema portátil de soldadura laser IPG LightWELD XR 1500 com tocha e cabos',
      },
      {
        file: 'equipment/ipg-lightweld-xr-1500/02.jpg',
        alt: 'Soldadura laser manual de uma peça metálica',
      },
    ],
  },
  'trulaser-1030': {
    intro: [
      ['No laser de chapa cortamos as seguintes espessuras:'],
      [
        {
          text: 'Ferro 15mm , aço inox 8mm , alumínio 4mm, galvanizado e zincor até 3mm.',
          bold: true,
        },
      ],
      ['Limites: ', { text: 'secção formato 3000x1500mm', bold: true }],
    ],
    gallery: [
      {
        file: 'equipment/trulaser-1030/01.jpg',
        alt: 'Máquina de corte laser Trumpf TruLaser 1030',
      },
      {
        file: 'equipment/trulaser-1030/02.jpg',
        alt: 'Cabeça de corte laser a cortar uma chapa',
      },
    ],
  },
  'trulaser-5000': {
    intro: [
      ['No laser de tubo cortamos as seguintes espessuras:'],
      [{ text: 'Aço ao carbono 8mm, aço inox 4mm, alumínio 2mm, cobre ou latão 3mm.', bold: true }],
      ['Limites: ', { text: 'secção quadrado 150x150mm ou redondo de 150mm', bold: true }],
    ],
    gallery: [
      {
        file: 'equipment/trulaser-5000/01.jpg',
        alt: 'Máquina de corte laser de tubo Trumpf TruLaser Tube 5000',
      },
      {
        file: 'equipment/trulaser-5000/02.jpg',
        alt: 'Corte laser de um tubo perfilado',
      },
    ],
  },
}

export const equipmentPagesEn: Record<string, { intro: Run[][]; galleryAlts: string[] }> = {
  'trumpf-trubend-7050': {
    intro: [
      [
        'The TruBend Series 7000 is a perfect example of operator and machine working together: small and medium parts are bent very economically. Space-saving for any production floor, this ergonomic high-speed machine bends small and medium parts under the best possible working conditions. Beyond its ergonomics and ease of operation, you reach an excellent result with outstanding quality thanks to the direct drive and our automatic angle measuring system. Working seated or standing is comfortable for the operator, and set-up is extremely fast and safe thanks to BendGuard.',
      ],
    ],
    galleryAlts: [
      'Operator bending a sheet metal part on the Trumpf TruBend 7050 press brake',
      'Bent sheet metal part between the tools of the TruBend 7050',
    ],
  },
  'trumpf-trubend-3170': {
    intro: [
      [
        'If every bend in your daily work has to be right and processes have to stay stable on a limited budget, you need a machine that does exactly that. The TruBend Series 3000 was developed to support you through your daily challenges, even when the bent parts are complex and demanding. The machine is versatile and reliable, with consistently stable operation. You benefit from precise angles, consistent component quality and solutions that visibly lighten the load on your production.',
      ],
      ['Because big results come from small teams.'],
    ],
    galleryAlts: [
      'Working area of the Trumpf TruBend 3170 press brake',
      'Tooling and back gauge on the TruBend 3170 press brake',
    ],
  },
  'ipg-lightweld-xr-1500': {
    intro: [
      [
        'The LightWELD handheld laser welding and cleaning systems were designed to transform the quality of your welds and your productivity. LightWELD laser welding is fast, easy to learn and delivers consistent, high-quality results across a wide range of materials and thicknesses. Laser cleaning before and after welding optimises weld quality while increasing productivity at the same time.',
      ],
    ],
    galleryAlts: [
      'IPG LightWELD XR 1500 handheld laser welding system with torch and cables',
      'Handheld laser welding of a metal part',
    ],
  },
  'trulaser-1030': {
    intro: [
      ['On the sheet laser we cut the following thicknesses:'],
      [
        {
          text: 'Iron 15mm, stainless steel 8mm, aluminium 4mm, galvanised and Zincor up to 3mm.',
          bold: true,
        },
      ],
      ['Limits: ', { text: 'sheet format 3000x1500mm', bold: true }],
    ],
    galleryAlts: [
      'Trumpf TruLaser 1030 laser cutting machine',
      'Laser cutting head cutting a sheet',
    ],
  },
  'trulaser-5000': {
    intro: [
      ['On the tube laser we cut the following thicknesses:'],
      [
        {
          text: 'Carbon steel 8mm, stainless steel 4mm, aluminium 2mm, copper or brass 3mm.',
          bold: true,
        },
      ],
      ['Limits: ', { text: 'square section 150x150mm or round 150mm', bold: true }],
    ],
    galleryAlts: [
      'Trumpf TruLaser Tube 5000 tube laser cutting machine',
      'Laser cutting of a profiled tube',
    ],
  },
}

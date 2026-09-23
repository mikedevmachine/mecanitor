/**
 * Tradução inglesa do conteúdo inicial. As chaves são os `slug` (serviços e
 * equipamentos) ou o índice do bloco, para casar com `content.ts`.
 * Moradas e nomes de produto ficam por traduzir de propósito.
 */

export const servicesEn: Record<
  string,
  {
    title: string
    titleSecondLine?: string
    alt: string
    intro?: string
    gallery?: { alt: string; client?: string; location?: string; description?: string }[]
  }
> = {
  'tube-laser-cutting': {
    title: 'Laser Cutting',
    titleSecondLine: 'of Tube',
    alt: 'Steel structure with laser-cut tube',
    intro:
      'Our laser cutting system for tube and profile produces highly complex holes, joints and chamfers in a single operation. It removes manual adjustment and streamlines final assembly, giving perfect joins and a clean finish on any structure.',
    gallery: [
      {
        alt: 'Suspended wine rack in steel tube',
        description: 'Suspended steel structure built into the bar counter.',
      },
      {
        alt: 'Balcony railing in steel tube',
        description: 'Balcony railing in steel tube with vertical balusters.',
      },
      {
        alt: 'Curved handrail in stainless steel tube',
        description: 'Curved handrail in stainless steel tube over an exterior stair.',
      },
      { alt: 'Ramp guardrail in steel tube', description: 'Access ramp guardrail in steel tube.' },
      {
        alt: 'Pergola structure in steel tube',
        description: 'Pergola structure in steel tube for an outdoor space.',
      },
      {
        alt: 'Metal canopy over a reflecting pool',
        description: 'Metal canopy over a reflecting pool.',
      },
      {
        alt: 'Curved tube parts in production',
        description: 'Curved tube parts on the workshop floor, in production.',
      },
      {
        alt: 'Balcony railings on a house',
        description: 'Balcony railings and gate on a detached house.',
      },
      {
        alt: 'Exterior railing in steel tube',
        description: 'Exterior railing in steel tube following a curved wall.',
      },
    ],
  },
  'sheet-laser-cutting': {
    title: 'Laser Cutting',
    titleSecondLine: 'of Sheet',
    alt: 'Decorative panel in laser-cut sheet metal',
    intro:
      'Using the latest generation of laser cutting technology, we work sheet metal with speed, repeatability and extremely tight tolerances. The result is clean edges with no thermal distortion, ready for high-precision assembly.',
    gallery: [
      {
        alt: 'Black sheet metal sign with backlit laser-cut lettering',
        location: 'Lisbon',
        description:
          'Signage in ZinCor sheet, laser cut with a powder-coated finish, forming hollow cut-out letters.',
      },
      {
        alt: 'Laser-cut sheet metal panel with geometric pattern and lettering',
        location: 'Lisbon',
        description:
          'Decorative metal panel installed with a repeating geometric pattern and applied lettering.',
      },
      {
        alt: 'Bar counter with perforated panels and illuminated lettering',
        location: 'Lisbon',
        description:
          'Counter and bar front with black decorative metalwork, perforated panels and illuminated lettering.',
      },
      {
        alt: 'Illuminated signage and metal blade sign at a restaurant entrance',
        location: 'Lisbon',
        description:
          'Signage and decorative metalwork with cut-out metal elements, light boxes and integrated supports.',
      },
      {
        alt: 'Steel structure with blue mesh over a sheet-metal clad facade',
        location: 'Lisbon',
        description: 'Metal structure with supports and complementary elements next to the facade.',
      },
      {
        alt: 'Sheet metal panels with “amadora” letters cut out in an urban garden',
        location: 'Amadora',
        description:
          'A set of urban signage in Corten steel with metal “amadora” lettering, set into a landscaped space.',
      },
      {
        alt: 'Interior steel staircase with sheet metal treads and mesh guard panels',
        description:
          'Interior metal staircase with perforated sheet treads and a lateral steel structure.',
      },
      {
        alt: 'Sign with three-dimensional metal letters on a clinic facade',
        description: 'Three-dimensional sign made up of large-format metal letters and symbols.',
      },
      {
        alt: 'Exterior signage totem made of blue painted metal boxes',
        location: 'Lisbon',
        description:
          'Exterior signage totem made up of large-format metal boxes, a support structure and a painted finish.',
      },
      {
        alt: 'Urban “amadora” sign in three-dimensional stainless steel letters',
        location: 'Amadora',
        description:
          'Large-format urban sign with three-dimensional lettering, built as a metal structure for outdoor installation.',
      },
      {
        alt: 'Curved gold sheet metal cladding with a perforated soffit',
        location: 'Lisbon',
        description:
          'Curved metal cladding in a gold finish, combining perforated sheet, structural ribs and linear lighting.',
      },
      {
        alt: 'Installing a laser-cut sheet metal panel in an arched opening',
        description:
          'Decorative metal panel for an arched opening, installed over existing frames.',
      },
      {
        alt: 'Steel sheet signage panel with laser-cut lettering',
        location: 'Lisbon',
        description:
          'Signage element in Corten steel, produced by laser cutting and sheet metal forming.',
      },
      {
        alt: 'Staircase clad in sheet metal with a solid painted steel side guard',
        location: 'Lisbon',
        description:
          'Staircase clad in sheet metal, with a solid painted steel side guard and stainless steel trims.',
      },
      {
        alt: 'Cut stainless steel lettering and logo on a building facade',
        location: 'Amadora',
        description: 'Sign made of cut brushed stainless steel sheet.',
      },
    ],
  },
  'sheet-metal-bending': {
    title: 'Sheet Metal Bending',
    alt: 'Bent sheet metal part',
    gallery: [
      {
        alt: 'Restaurant counter with textured panel wall cladding',
        location: 'Lisbon',
        description: 'Stainless steel metalwork including sheet metal wall cladding.',
      },
      {
        alt: 'Sheet steel signage plate with the name GLEBA cut out',
        location: 'Lisbon',
        description:
          'Signage element in Corten steel, produced by laser cutting and sheet metal forming.',
      },
      {
        alt: 'Steel staircase with sheet-metal treads on painted steel stringers',
        description: 'Metal staircase made with profiles and sheet steel steps.',
      },
      {
        alt: 'Bakery display unit with metal frame and backlit panels',
        location: 'Lisbon',
        description: 'Display unit in a galvanised metal structure, lacquered in a copper tone.',
      },
      {
        alt: 'Curved steel staircase structure being assembled in the workshop',
        location: 'Lisbon',
        description: 'Curved staircase structure, made of rolled steel plates and welded steps.',
      },
      {
        alt: 'Brushed stainless steel extraction hood above a commercial kitchen',
        location: 'Lisbon',
        description: 'Brushed stainless steel cladding applied over a metal structure.',
      },
      {
        alt: 'Helical steel staircase with curved plate balustrade beside a facade',
        location: 'Lisbon',
        description:
          'Helical staircase in rolled steel, fitted with steps in olive-leaf pattern chequered plate.',
      },
      {
        alt: 'Helical staircase clad in polished bronze-toned sheet metal',
        location: 'Lisbon',
        description:
          'Helical staircase with continuous metal cladding and a dark architectural finish.',
      },
      {
        alt: 'Interior steel staircase seen from below, with steel side structure',
        description:
          'Interior metal staircase with perforated sheet steps and a steel side structure.',
      },
      {
        alt: 'Technicians fitting metal trim along the top of a bar counter',
        description:
          'Metal structure and cladding during installation, produced for a bar and restaurant area.',
      },
      {
        alt: 'Metal louvred enclosure with horizontal slats and a slotted top',
        description:
          'Ventilated metal enclosure made up of horizontal louvre blades and support profiles, serving as a technical screen while allowing air circulation.',
      },
      {
        alt: 'Steel staircase with cantilevered treads on a central beam',
        description:
          'Interior metal staircase, with cantilevered treads supported on a central structure.',
      },
      {
        alt: 'Counter with a metal frame, glass panels and recessed lighting',
        description:
          'Service counter built with a metal structure, countertops and integrated panels.',
      },
      {
        alt: 'Steel spiral staircase enclosed by a cylinder of metal mesh',
        description:
          'Interior steel spiral staircase, enclosed by a cylindrical structure of metal mesh.',
      },
      {
        alt: 'Metal blade ceiling in an office floor with a glazed facade',
        description: 'Metal blade system installed in a ceiling for lighting integration.',
      },
      {
        alt: 'Kiosk counter in blue lacquered panels with white columns',
        description:
          'Indoor kiosk with a metal structure, lacquered panels, integrated lighting and service counters.',
      },
      {
        alt: 'Long Corten steel planter trough beside a restaurant terrace',
        description:
          'Longitudinal planter in Corten steel with welded construction and a naturally oxidised finish.',
      },
      {
        alt: 'Corten steel urban landmark with raised AMADORA lettering',
        location: 'Amadora',
        description: 'Urban landmark in Corten steel with three-dimensional "AMADORA" lettering.',
      },
      {
        alt: 'Metal panels with cut-out letters “amadora” in a landscaped area',
        location: 'Amadora',
        description:
          'Set of urban signage in Corten steel with metal letters spelling “amadora”, integrated into a landscaped area.',
      },
      {
        alt: 'Two-leaf metal gate with angled slats over perforated sheet',
        description: 'Metal gate with a welded frame and an infill of angled slats.',
      },
      {
        alt: 'Curved gold-finished metal cladding with perforated sheet at ceiling',
        location: 'Lisbon',
        description:
          'Curved metal cladding in a gold finish, combining perforated sheet, structural ribs and linear lighting.',
      },
      {
        alt: 'Exterior steel staircase with zigzag flights and curved landings',
        description: 'Metal staircases with independent flights, landings and steel railings.',
      },
      {
        alt: 'Road underpass clad in Corten steel with portal sign and lettering',
        location: 'Amadora',
        description:
          'Urban intervention in Corten steel combining cladding, a sculptural portal and lettering.',
      },
      {
        alt: 'Steel helical staircase with curved outer plate and metal treads',
        description:
          'Interior steel helical staircase, with a continuous curved structure and metal treads.',
      },
      {
        alt: 'Urban wayfinding marker in sheet metal with applied logo',
        location: 'Amadora',
        description:
          'Urban wayfinding marker, made up of formed sheet metal and applied graphic elements.',
      },
      {
        alt: 'Three-dimensional "amadora" lettering in polished sheet metal on grass',
        location: 'Amadora',
        description:
          'Large-format urban sign with three-dimensional lettering, built as a steel structure for outdoor installation.',
      },
      {
        alt: 'Bar counter with perforated panels and illuminated lettering',
        location: 'Lisbon',
        description:
          'Counter and bar front with black decorative metalwork, perforated panels and illuminated lettering.',
      },
      {
        alt: 'Suspended metal structure with Taberna sign and hanging hams',
        description:
          'Suspended metal structure for the "Taberna" area, used to support lighting, decorative elements and products, combining service functionality with a strong scenographic presence.',
      },
      {
        alt: 'Illuminated arched sign and backlit menu boxes on a restaurant façade',
        location: 'Lisbon',
        description:
          'Signage and decorative metalwork with cut metal elements, light boxes and integrated brackets.',
      },
      {
        alt: 'Two-leaf sheet metal gate with the opening lined in metal sheet',
        location: 'Lisbon',
        description:
          'Two-leaf metal gate with solid leaves and a reinforced structure, with perimeter lining of the opening in sheet iron.',
      },
      {
        alt: 'Staircase clad in sheet metal with a solid painted steel side guard',
        location: 'Lisbon',
        description:
          'Staircase clad in sheet metal, with a solid side guard in painted steel and stainless steel trims.',
      },
      {
        alt: 'Grey panelled sliding metal gate alongside a white boundary wall',
        location: 'Lisbon',
        description:
          'Sliding metal gate in opaque panels, with a reinforced frame and grey finish, prepared for automation.',
      },
      {
        alt: 'Sheet metal technical cabinet with doors and ventilation louvres',
        description:
          'Technical cabinet in sheet metal, with doors, ventilation grilles and integrated locks.',
      },
      {
        alt: 'Three-dimensional metal letters on a medical clinic facade',
        description: 'Three-dimensional sign made up of large-format metal letters and symbols.',
      },
      {
        alt: 'Exterior signage in blue metal boxes mounted on top of a wall',
        location: 'Lisbon',
        description:
          'Exterior signage totem made up of large-format metal boxes, a support structure and a painted finish.',
      },
      {
        alt: 'Bent sheet metal enclosure lacquered light blue on a wrapped pedestal',
        description: 'Set of technical enclosures and pedestals in bent and lacquered sheet metal.',
      },
      {
        alt: 'Dome clad in overlapping metal scales on a radial steel frame',
        location: 'Lisbon',
        description:
          'Structure made up of a radial metal frame and a dome clad in small overlapping sheets with a three-dimensional construction.',
      },
      {
        alt: 'Sheet metal sliding doors with ventilation louvres',
        location: 'Sintra',
        description:
          'Sliding opening for access to the workshops, comprising two rectangular sliding doors and ventilation louvres.',
      },
      {
        alt: 'Workshop floor with recessed steel covers and anti-slip chequer plates',
        description:
          'Integrated metal elements including covers and anti-slip plates for technical access.',
      },
      {
        alt: 'Blue canopy over a metal structure on a gym facade',
        location: 'Lisbon',
        description: 'Metal structure with supports and complementary elements next to the facade.',
      },
      {
        alt: 'Steel profile entrance canopy over a glazed building facade',
        description: 'Metal entrance canopy with a rectangular structure in steel profiles.',
      },
      {
        alt: 'Entrance panel with number 17 and floor numbers in low relief',
        description:
          'Aluminium panel with floor numbers milled in low relief and a powder-coated finish.',
      },
    ],
  },
  'laser-welding': {
    title: 'Laser Welding',
    alt: 'Laser welding work on metal',
    intro:
      'Representing the state of the art in metal joining, laser welding produces extremely fine, deep welds of superior strength. With minimal heat input we preserve the integrity and appearance of the material, avoiding distortion even on delicate parts.',
  },
  'iron-metalwork': {
    title: 'Metalwork',
    titleSecondLine: 'in Iron',
    alt: 'Ironwork',
    intro:
      'We carry out every kind of ironwork, with the machinery and the skilled people to do it. We turn iron into the backbone of landmark architectural and industrial projects. Combining engineering rigour with the most advanced techniques in this trade, we build everything from heavy structures of high load capacity to decorative elements with fine, hard-wearing finishes.',
  },
  'stainless-steel-metalwork': {
    title: 'Metalwork in',
    titleSecondLine: 'Stainless Steel',
    alt: 'Stainless steel metalwork',
    intro:
      'Our company is equipped with machinery and resources that meet the highest standards of quality and demand, with facilities dedicated to this kind of work — in particular for environments with strict hygiene requirements, modern architecture and luxury spaces. Because environmental responsibility is one of the founding principles of Mecanitor, using materials such as stainless steel follows the rules for sustainable development.',
  },
  'aluminium-metalwork': {
    title: 'Metalwork',
    titleSecondLine: 'in Aluminium',
    alt: 'Aluminium metalwork',
    intro:
      'For projects that call for high structural strength together with the lowest possible weight, our aluminium solutions are the perfect combination. We work with high-precision profiles and sheet for architectural and industrial applications, for results that are both functional and good to look at.',
  },
  'corten-steel-metalwork': {
    title: 'Metalwork',
    titleSecondLine: 'in Corten Steel',
    alt: 'Corten steel metalwork',
    intro:
      'Corten steel is the ideal fusion of the strength of metal and the organic beauty of time. We develop bespoke pieces and cladding where the protective layer of natural oxidation gives a unique identity, exceptional durability and a striking presence in architecture and outdoor design.',
  },
  'indoor-surface-treatment': {
    title: 'Surface Treatment',
    titleSecondLine: 'indoor',
    alt: 'Indoor surface treatment',
    intro:
      'We make sure every piece is ready for the harshest environments. Our surface preparation and treatment processes are rigorous, giving maximum adhesion, immunity to corrosion and a perfect base for the final finish.',
  },
  'outdoor-surface-treatment': {
    title: 'Surface Treatment',
    titleSecondLine: 'outdoor',
    alt: 'Outdoor surface treatment',
    intro:
      'We make sure every piece is ready for the harshest environments. Our surface preparation and treatment processes are rigorous, giving maximum adhesion, immunity to corrosion and a perfect base for the final finish.',
  },
}

export const equipmentEn: Record<string, { category: string; alt: string }> = {
  'trumpf-trubend-7050': { category: 'Press Brake', alt: 'Trumpf TruBend 7050 press brake' },
  'trumpf-trubend-3170': { category: 'Press Brake', alt: 'Trumpf TruBend 3170 press brake' },
  'ipg-lightweld-xr-1500': {
    category: 'Laser Welding',
    alt: 'IPG Lightweld XR 1500 laser welding system',
  },
  'trulaser-1030': { category: 'Laser Cutting', alt: 'TruLaser 1030 laser cutting machine' },
  'trulaser-5000': {
    category: 'Laser Cutting',
    alt: 'TruLaser Tube 5000 tube laser cutting machine',
  },
}

export const equipmentLinkLabelEn = 'SEE MORE'

export const navItemsEn = [
  { label: 'SERVICES', href: '#services' },
  { label: 'ABOUT US', href: '#about' },
  { label: 'EQUIPMENT', href: '#equipment' },
  { label: 'CONTACT', href: '#contact' },
]

export const taglineEn = [
  { text: 'Inspired by ', emphasis: false },
  { text: 'Design', emphasis: true },
  { text: ', we manufacture ', emphasis: false },
  { text: 'function', emphasis: true },
]

export const aboutBlocksEn: { title: string; paragraphs: string[]; alt: string }[] = [
  {
    title: 'MECANITOR',
    alt: 'Metal façade built by Mecanitor',
    paragraphs: [
      'Welcome to Mecanitor online.',
      'Founded in 1990, Mecanitor took “function and design” as the guiding principles of its work. Always committed to the client, we work with professionalism and efficiency.',
      'We carry out metalwork in iron and stainless steel — staircases, handrails, street furniture and structural steelwork. We are based on the outskirts of Lisbon, in Camarate, but we install throughout the country, including the autonomous regions. Beyond Portugal, we have exported to Spain, Luxembourg, Senegal and Cape Verde.',
      'If you are looking for quality work at the best price, get in touch.',
    ],
  },
  {
    title: 'SOCIAL MISSION',
    alt: 'Steel structure assembled by the Mecanitor team',
    paragraphs: [
      'Mecanitor currently employs around thirty people, and that number is growing steadily. Having overcome its share of adversity, the company has grown not only in workforce but in the quantity and quality of the services it provides. This comes down to our hiring policy: we do not recruit on the basis of age or experience alone. We rely on people who have worked in this trade for many years, as well as on young people with vocational training who want to join us. We also have agreements with training centres so that we can take on trainees looking to enter the labour market.',
      'We are equally mindful of environmental concerns and recycle our surplus ferrous material. That concern extends to surface treatment, where we chose hydro-blasting over steel-grit blasting. This lets us work more efficiently and keeps disruption to those around us to a minimum.',
    ],
  },
  {
    title: 'TEMPORARY WORK',
    alt: 'Mecanitor team carrying out maintenance work',
    paragraphs: [
      'The experience gained on the job allowed Mecanitor to identify complementary lines of business that would broaden its activity. That made a maintenance service viable. Its main purpose is client retention, since contact with a client was often lost once the work was finished. The service also introduced a warranty on completed work, which further increased client confidence. Everything here works towards closer ties with our clients, keeping them with Mecanitor.',
      'Among the many maintenance operations, the most frequent are small repairs such as adjusting gates and replacing locks. That said, our teams also have the skills to solve large-scale problems.',
      'As with the Civil Metalwork Service, the Maintenance Service has no geographical limits: Mecanitor intends to establish itself across the country and beyond.',
    ],
  },
]

/** Moradas mantêm-se — só a designação muda. */
export const locationNamesEn = ['Mecanitor Lda - Iron', 'Mecanitor Lda - Laser and Stainless Steel']

export const contactEn = {
  generalEmailLabel: 'GENERAL EMAIL',
  whatsappPrefix: 'CONTACT US ON',
  formHeading: 'Talk to us',
  formLabels: {
    name: 'NAME',
    email: 'E-MAIL',
    message: 'MESSAGE',
    upload: 'UPLOAD FILES',
    submit: 'SEND',
  },
}

export const mapAltEn = 'Map showing the Mecanitor sites'

export const footerCopyrightEn = 'All rights reserved / MECANITOR'

export const homeLabelsEn = {
  servicesLabel: 'SERVICES',
  aboutLabel: 'ABOUT US',
  equipmentLabel: 'EQUIPMENT',
  contactLabel: 'CONTACT',
}

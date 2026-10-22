/**
 * Page content for the marketing sections.
 *
 * NOTE FOR EDITORS
 * - `statistics` and `testimonials` are illustrative sample content, not
 *   verified company data or real customer statements. Replace them before
 *   the site is used publicly.
 * - No certification, award, membership or approval is claimed anywhere.
 */

export const hero = {
  eyebrow: 'AKAM BITUMEN CO.',
  title: 'Our Services',
  description:
    'From the most remote corners of the Earth comes the materials and expertise that support modern industry.',
};

export const servicesIntro = {
  eyebrow: 'What We Do',
  title: 'Reliable bitumen for a stronger tomorrow',
  description:
    'AKAM BITUMEN CO. delivers dependable bitumen supply and petroleum solutions through a commitment to product quality, operational reliability, and professional service.',
};

export const statistics = [
  {
    value: 75,
    label: 'Supply Reliability',
    description: 'Deliveries planned against the agreed schedule.',
  },
  {
    value: 87,
    label: 'Customer Satisfaction',
    description: 'Repeat business from distributors and contractors.',
  },
  {
    value: 95,
    label: 'Quality Commitment',
    description: 'Specifications confirmed before every shipment.',
  },
  {
    value: 92,
    label: 'Project Success',
    description: 'Supply programmes matched to site requirements.',
  },
];

export const statsBanner = {
  eyebrow: "Let's build something great together",
  title: 'Powerful bitumen solutions for a sustainable future',
  description:
    'Reliable supply, professional service, and a long-term commitment to quality for customers across the industrial and infrastructure sectors.',
  cta: { label: 'Discover more', href: '/about#company-overview' },
};

export const whyChooseUs = {
  eyebrow: 'Why Choose Us',
  title: 'Promoting responsible use of petroleum resources',
  description:
    'At AKAM BITUMEN CO., we focus on dependable product sourcing, consistent quality, and professional service. Our goal is to support customers with practical solutions, transparent communication, and reliable supply.',
  image: {
    large: {
      key: 'pipes',
      alt: 'Steel pipes and processing equipment at an industrial plant',
    },
    small: {
      key: 'pumpjack',
      alt: 'Oil pump jack silhouetted against a red sunset',
    },
  },
  features: [
    {
      icon: 'leaf',
      title: 'Quality',
      description: 'Carefully sourced products and a strong commitment to consistent specifications.',
    },
    {
      icon: 'shield',
      title: 'Reliable',
      description: 'Dependable coordination, responsive communication, and professional service.',
    },
    {
      icon: 'star',
      title: 'Efficient',
      description: 'Practical supply solutions designed around customer requirements.',
    },
  ],
};

/**
 * SAMPLE TESTIMONIALS — placeholder copy supplied for layout purposes.
 * These are not verified customer statements; replace with real, approved
 * feedback before publishing.
 */
export const testimonials = [
  {
    id: 'richard-bravo',
    name: 'Richard Bravo',
    role: 'Procurement Manager',
    quote:
      'The team provided clear communication and dependable coordination throughout our supply process.',
    portrait: 'portraitRichard',
  },
  {
    id: 'nathan-coleman',
    name: 'Nathan Coleman',
    role: 'Construction Director',
    quote:
      'A professional partner that understands industrial requirements and delivers a consistently organized service.',
    portrait: 'portraitNathan',
  },
  {
    id: 'kelly-beavers',
    name: 'Kelly Beavers',
    role: 'Business Development Manager',
    quote:
      'Responsive support, professional service, and a straightforward approach to our business requirements.',
    portrait: 'portraitKelly',
  },
];

export const newsletter = {
  title: 'Newsletter',
  description: 'Subscribe to receive company updates, product information, and industry news.',
  note: 'Subscriptions are stored in this site’s own database and are not shared with third parties.',
};

export const about = {
  overview: [
    'AKAM BITUMEN CO. is a supplier of bitumen and petroleum products for road construction, infrastructure and industrial customers. We work between producers and the projects that consume their output.',
    'Our role is deliberately practical: confirm what can be supplied, at what specification, when it can be delivered, and then hold to that. It is a straightforward approach that suits customers who buy material against a programme rather than a catalogue.',
  ],
  mission: {
    title: 'Our mission',
    body: [
      'To make bitumen and petroleum supply dependable — consistent specifications, honest lead times, and coordination that does not need chasing.',
      'We measure ourselves on the deliveries that arrive as planned and the relationships that continue into the next project.',
    ],
  },
  values: [
    {
      icon: 'shield',
      title: 'Reliability',
      description: 'Confirmed quantities and dates are commitments we hold to.',
    },
    {
      icon: 'leaf',
      title: 'Responsibility',
      description: 'Material handling and supply planned to avoid waste and rework.',
    },
    {
      icon: 'gauge',
      title: 'Clarity',
      description: 'Straight answers on grades, volumes, terms and timing.',
    },
    {
      icon: 'star',
      title: 'Consistency',
      description: 'The same specification and service from the first order onward.',
    },
  ],
};

/**
 * Capability areas shown on the Projects page. These describe the supply
 * work we take on — they are not claims about named customer contracts.
 */
export const programmes = [
  {
    icon: 'construction',
    title: 'Road & highway supply',
    description:
      'Phased binder supply for road and highway programmes, scheduled around the paving sequence.',
  },
  {
    icon: 'container',
    title: 'Distributor replenishment',
    description:
      'Scheduled bulk supply for distributors who hold stock against regular regional demand.',
  },
  {
    icon: 'ship',
    title: 'Export consignments',
    description:
      'Consolidated shipments with the export documentation package prepared per consignment.',
  },
  {
    icon: 'factory',
    title: 'Industrial plant support',
    description:
      'Repeat material supply for processing and manufacturing sites with continuous demand.',
  },
  {
    icon: 'warehouse',
    title: 'Multi-site programmes',
    description:
      'One supply arrangement covering several delivery points under a single point of contact.',
  },
  {
    icon: 'fuel',
    title: 'Product sourcing',
    description:
      'Requirement-led sourcing for specifications that need a producer and a route to site.',
  },
];

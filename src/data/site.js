/** Site-wide content: brand, navigation, services, team, social proof. */

export const site = {
  name: 'Horizon Properties',
  shortName: 'Horizon',
  legalName: 'Horizon Properties Group LLC',
  description:
    'Horizon Properties is a boutique agency representing exceptional homes and considered investments across the United States.',
  phone: '(555) 246-7890',
  phoneHref: 'tel:+15552467890',
  email: 'hello@horizonproperties.com',
  emailHref: 'mailto:hello@horizonproperties.com',
  address: {
    line1: '18 Westgate Terrace, Suite 400',
    line2: 'Austin, Texas 78701',
  },
  hours: 'Mon – Fri, 9:00 – 18:00 CT',
  founded: 2009,
  social: [
    { label: 'Instagram', href: 'https://instagram.com', icon: 'Instagram' },
    { label: 'LinkedIn', href: 'https://linkedin.com', icon: 'Linkedin' },
    { label: 'X', href: 'https://x.com', icon: 'Twitter' },
    { label: 'YouTube', href: 'https://youtube.com', icon: 'Youtube' },
  ],
};

export const navigation = [
  { label: 'Home', to: '/' },
  { label: 'Properties', to: '/properties' },
  { label: 'About Us', to: '/about' },
  { label: 'Services', to: '/services' },
  { label: 'Team', to: '/team' },
  { label: 'Contact', to: '/contact' },
];

export const services = [
  {
    id: 'luxury-home-sales',
    index: '01',
    title: 'Luxury Home Sales',
    icon: 'building',
    summary:
      'Discreet representation for exceptional homes, from first valuation to closing day.',
    description:
      'We take on a small number of instructions at a time so every sale gets the attention it needs. Photography, film, floor plans and copy are commissioned specifically for each property, and every viewing is accompanied by an advisor who knows the house and the neighbourhood.',
    includes: [
      'Bespoke photography, film and floor plans',
      'Private and off-market introductions',
      'Accompanied viewings and buyer vetting',
      'Negotiation and closing management',
    ],
    image: 'photo-1600596542815-ffad4c1539a9',
  },
  {
    id: 'property-investment',
    index: '02',
    title: 'Property Investment',
    icon: 'chart',
    summary:
      'Sourcing and underwriting for buyers who treat property as a portfolio, not a purchase.',
    description:
      'Our investment desk models yield, holding costs, financing and exit assumptions before a client sees a property, then negotiates on the strength of that analysis. We manage acquisitions across single assets and small portfolios.',
    includes: [
      'Yield, cost and exit modelling',
      'Off-market sourcing across target markets',
      'Portfolio structuring and financing introductions',
      'Ongoing performance reviews',
    ],
    image: 'photo-1560185127-6ed189bf02f4',
  },
  {
    id: 'property-marketing',
    index: '03',
    title: 'Property Marketing',
    icon: 'megaphone',
    summary:
      'Editorial-quality campaigns that place a property in front of the right buyers.',
    description:
      'A house is only as visible as the way it is presented. We build each campaign around a specific buyer profile — the publication, the timing, the invitation list — and handle the writing, art direction and media buying in-house.',
    includes: [
      'Art direction and copywriting',
      'Print, digital and social placement',
      'Private launch events',
      'Campaign reporting and buyer feedback',
    ],
    image: 'photo-1616594039964-ae9021a400a0',
  },
  {
    id: 'real-estate-advisory',
    index: '04',
    title: 'Real Estate Advisory',
    icon: 'compass',
    summary:
      'Independent guidance on when to buy, when to hold, and what a property is really worth to you.',
    description:
      'Clients come to us with questions that sit outside a single transaction: whether to restructure a portfolio, how to hold an asset across generations, or which market to enter next. We answer them with research rather than opinion.',
    includes: [
      'Portfolio and holding strategy',
      'Market research and comparables',
      'Cross-border ownership guidance',
      'Development and planning introductions',
    ],
    image: 'photo-1497366754035-f200968a6e72',
  },
  {
    id: 'property-valuation',
    index: '05',
    title: 'Property Valuation',
    icon: 'scale',
    summary:
      'Confident, evidence-based valuations for owners, buyers and advisors.',
    description:
      'Every valuation is built from verified comparables, current buyer appetite and a physical inspection of the property. You receive a written opinion with the reasoning behind it — useful for sale pricing, refinancing, estate planning or dispute.',
    includes: [
      'Physical inspection and condition notes',
      'Verified comparable analysis',
      'Written opinion with supporting evidence',
      'Refinance and estate planning support',
    ],
    image: 'photo-1600607688969-a5bfcd646154',
  },
  {
    id: 'relocation-services',
    index: '06',
    title: 'Relocation Services',
    icon: 'plane',
    summary:
      'End-to-end support for families and executives moving to a new city.',
    description:
      'We handle the parts of a move that are hardest to do remotely: shortlisting on your behalf, filming walkthroughs, coordinating inspections, and managing the timeline so the move happens once, not twice.',
    includes: [
      'Area and school shortlisting',
      'Remote viewings and filmed walkthroughs',
      'Inspection, legal and moving coordination',
      'Settling-in support after completion',
    ],
    image: 'photo-1522708323590-d24dbb6b0267',
  },
];

export const team = [
  {
    id: 'daniel-morgan',
    name: 'Daniel Morgan',
    role: 'Managing Director',
    photo: 'photo-1560250097-0b93528c311a',
    focus: 'Luxury residential · Austin and the Hill Country',
    years: 16,
    bio: 'Daniel founded Horizon in 2009 after a decade in architecture and development. He leads the agency’s private client work and personally represents the studio’s most significant houses.',
    email: 'daniel@horizonproperties.com',
    phone: '(555) 246-7891',
  },
  {
    id: 'olivia-carter',
    name: 'Olivia Carter',
    role: 'Luxury Property Advisor',
    photo: 'photo-1573496359142-b8d87734a5a2',
    focus: 'Coastal California · Architectural houses',
    years: 11,
    bio: 'Olivia advises buyers and sellers along the California coast, with a particular interest in architect-designed houses and the way a good property is presented to the market.',
    email: 'olivia@horizonproperties.com',
    phone: '(555) 246-7892',
  },
  {
    id: 'james-wilson',
    name: 'James Wilson',
    role: 'Investment Consultant',
    photo: 'photo-1472099645785-5658abf4ff4e',
    focus: 'Investment sourcing · Yield and portfolio strategy',
    years: 13,
    bio: 'James runs the investment desk, underwriting every acquisition we recommend and building the yield models our clients use to decide between holding and selling.',
    email: 'james@horizonproperties.com',
    phone: '(555) 246-7893',
  },
  {
    id: 'sophia-bennett',
    name: 'Sophia Bennett',
    role: 'Senior Property Specialist',
    photo: 'photo-1494790108377-be9c29b29330',
    focus: 'New developments · Relocation',
    years: 9,
    bio: 'Sophia works with developers and relocating families, managing launches and long transaction timelines with an insistence on getting the details right.',
    email: 'sophia@horizonproperties.com',
    phone: '(555) 246-7894',
  },
];

export const whyHorizon = [
  {
    id: 'curated',
    label: 'Curated',
    text: 'We represent fewer properties than the market expects, so each one gets the campaign, the attention and the adviser it deserves.',
  },
  {
    id: 'transparent',
    label: 'Transparent',
    text: 'Clear fees, honest valuations and no pressure. If a property is not right for you, we will tell you before you make an offer.',
  },
  {
    id: 'proven',
    label: 'Proven',
    text: 'Sixteen years, more than a thousand completions, and a client list that returns and refers rather than shops around.',
  },
];

export const stats = [
  { label: 'Client Satisfaction', value: 98 },
  { label: 'Sold Above Asking', value: 92 },
  { label: 'Repeat & Referral Clients', value: 87 },
  { label: 'Off-Market Introductions', value: 74 },
];

export const achievements = [
  { value: '$2.4B', label: 'Property transacted' },
  { value: '1,240+', label: 'Completions since 2009' },
  { value: '38', label: 'Markets represented' },
  { value: '4.9/5', label: 'Average client rating' },
];

export const testimonials = [
  {
    id: 'testimonial-1',
    quote:
      'They understood the house before we did. Three weeks from instruction to a completed sale, above the figure we had been told to expect.',
    name: 'Marcus Hollis',
    role: 'Seller · Austin, Texas',
    photo: 'photo-1556157382-97eda2d62296',
  },
  {
    id: 'testimonial-2',
    quote:
      'We bought from overseas. Every viewing was filmed properly, every question answered the same day, and nothing was glossed over in the paperwork.',
    name: 'Amelia Nguyen',
    role: 'Buyer · Malibu, California',
    photo: 'photo-1580489944761-15a19d654956',
  },
  {
    id: 'testimonial-3',
    quote:
      'James modelled the numbers before we committed to anything. That analysis is why the portfolio performs the way it does now.',
    name: 'Robert Ellery',
    role: 'Investor · Scottsdale, Arizona',
    photo: 'photo-1544005313-94ddf0286df2',
  },
];

export const contactSubjects = [
  'General enquiry',
  'Buying a property',
  'Selling a property',
  'Investment advice',
  'Valuation request',
  'Press or partnership',
];

export const heroImageId = 'photo-1613977257363-707ba9348227';
export const statsImageId = 'photo-1600573472550-8090b5e0745e';
export const aboutImageMainId = 'photo-1600596542815-ffad4c1539a9';
export const aboutImageSideId = 'photo-1600607687939-ce8a6c25118c';
export const whyImageId = 'photo-1600585154526-990dced4db0d';

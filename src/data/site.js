/**
 * Brand, contact details and navigation.
 *
 * Every value the marketing team is likely to change lives here — components
 * only read from this module. `match` lists the route prefixes that light up a
 * navigation item.
 */

export const site = {
  name: 'AKAM BITUMEN CO.',
  tagline: 'Bitumen supply & industrial solutions',
  description:
    'AKAM BITUMEN CO. provides professional bitumen supply, petroleum products, industrial materials, and supply solutions for construction and industrial customers.',
  logo: '/logo.png',
  logoAlt: 'AKAM BITUMEN CO. logo',
  // Placeholder contact details — replace with the company's real numbers.
  phone: { label: '+98 21 0000 0000', href: 'tel:+98210000000' },
  email: { label: 'info@akambitumen.com', href: 'mailto:info@akambitumen.com' },
  address: 'Company address to be provided.',
  website: 'akambitumen.com',
};

/**
 * Social profiles — placeholder destinations.
 * Point each href at the company's own page before launch.
 */
export const socialLinks = [
  { id: 'facebook', label: 'Facebook', href: 'https://www.facebook.com/' },
  { id: 'twitter', label: 'Twitter', href: 'https://twitter.com/' },
  { id: 'instagram', label: 'Instagram', href: 'https://www.instagram.com/' },
  { id: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/' },
];

export const navigation = [
  { label: 'Home', href: '/', match: ['/'] },
  {
    label: 'About Us',
    href: '/about',
    match: ['/about'],
    children: [
      { label: 'Company Overview', href: '/about#company-overview' },
      { label: 'Our Mission', href: '/about#mission' },
      { label: 'Why Choose Us', href: '/about#why-choose-us' },
    ],
  },
  {
    label: 'Services',
    href: '/services',
    match: ['/services'],
    children: [
      { label: 'Bitumen Supply', href: '/services/bitumen-supply' },
      { label: 'Petroleum Products', href: '/services/petroleum-products' },
      { label: 'Industrial Solutions', href: '/services/industrial-solutions' },
      { label: 'Export & Logistics', href: '/services/export-logistics' },
    ],
  },
  { label: 'Contact', href: '/contact', match: ['/contact'] },
  {
    label: 'Pages',
    href: '/projects',
    match: ['/projects', '/testimonials', '/faq', '/privacy-policy', '/cookie-policy', '/terms-of-use'],
    children: [
      { label: 'Services', href: '/services' },
      { label: 'Projects', href: '/projects' },
      { label: 'Testimonials', href: '/testimonials' },
      { label: 'Contact', href: '/contact' },
    ],
  },
];

export const footerColumns = [
  {
    title: 'Company',
    links: [
      { label: 'About Us', href: '/about' },
      { label: 'Company Overview', href: '/about#company-overview' },
      { label: 'Our Values', href: '/about#values' },
      { label: 'Projects', href: '/projects' },
      { label: 'Contact Us', href: '/contact' },
    ],
  },
  {
    title: 'Services',
    links: [
      { label: 'Bitumen Supply', href: '/services/bitumen-supply' },
      { label: 'Petroleum Products', href: '/services/petroleum-products' },
      { label: 'Industrial Solutions', href: '/services/industrial-solutions' },
      { label: 'Road Construction', href: '/services/road-construction' },
      { label: 'Export & Logistics', href: '/services/export-logistics' },
      { label: 'Bulk Supply', href: '/services/bulk-supply' },
    ],
  },
  {
    title: 'Support',
    links: [
      { label: 'Contact Support', href: '/contact' },
      { label: 'Frequently Asked Questions', href: '/faq' },
      { label: 'Shipping Information', href: '/faq#shipping-information' },
      { label: 'Product Information', href: '/faq#product-information' },
      { label: 'Request a Quote', href: '/contact#request-a-quote' },
    ],
  },
];

export const legalLinks = [
  { label: 'Privacy Policy', href: '/privacy-policy' },
  { label: 'Cookie Policy', href: '/cookie-policy' },
  { label: 'Terms of Use', href: '/terms-of-use' },
];

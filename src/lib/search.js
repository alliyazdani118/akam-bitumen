import { services } from '../data/services.js';

/** Everything the header search can reach, with a short description. */
export const searchIndex = [
  { title: 'Home', description: 'Bitumen supply and industrial solutions', href: '/' },
  { title: 'About Us', description: 'Company overview, mission and values', href: '/about' },
  { title: 'Services', description: 'The six supply services we provide', href: '/services' },
  ...services.map((service) => ({
    title: service.title,
    description: service.summary,
    href: `/services/${service.slug}`,
  })),
  { title: 'Projects', description: 'Supply programmes and capability areas', href: '/projects' },
  {
    title: 'Testimonials',
    description: 'What customers say about working with us',
    href: '/testimonials',
  },
  { title: 'Contact', description: 'Enquiries, quotes and support', href: '/contact' },
  {
    title: 'Frequently Asked Questions',
    description: 'Product information, shipping and ordering',
    href: '/faq',
  },
  { title: 'Privacy Policy', description: 'How submitted details are handled', href: '/privacy-policy' },
  { title: 'Cookie Policy', description: 'Cookies and browser storage', href: '/cookie-policy' },
  { title: 'Terms of Use', description: 'Terms for using this website', href: '/terms-of-use' },
];

/** Simple ranked substring search — good enough for a site this size. */
export function searchSite(query, limit = 6) {
  const terms = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
  if (terms.length === 0) return [];

  return searchIndex
    .map((entry) => {
      const haystack = `${entry.title} ${entry.description}`.toLowerCase();
      const score = terms.reduce((total, term) => total + (haystack.includes(term) ? 1 : 0), 0);
      return { entry, score };
    })
    .filter((result) => result.score > 0)
    .sort((a, b) => b.score - a.score || a.entry.title.localeCompare(b.entry.title))
    .slice(0, limit)
    .map((result) => result.entry);
}

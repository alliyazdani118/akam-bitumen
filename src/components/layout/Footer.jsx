import { ArrowUp } from 'lucide-react';
import {
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Twitter,
  Youtube,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { site } from '../../data/site.js';
import BrandMark from '../ui/BrandMark.jsx';
import NewsletterForm from './NewsletterForm.jsx';

const SOCIAL_ICONS = { Instagram, Linkedin, Twitter, Youtube };

const columns = [
  {
    title: 'Company',
    links: [
      { label: 'Home', to: '/' },
      { label: 'About Us', to: '/about' },
      { label: 'Services', to: '/services' },
      { label: 'Team', to: '/team' },
    ],
  },
  {
    title: 'Properties',
    links: [
      { label: 'All properties', to: '/properties' },
      { label: 'Villas', to: '/properties?type=Villa' },
      { label: 'Estates', to: '/properties?type=Estate' },
      { label: 'Penthouses', to: '/properties?type=Penthouse' },
      { label: 'Saved properties', to: '/properties?saved=1' },
    ],
  },
  {
    title: 'Support',
    links: [
      { label: 'Contact', to: '/contact' },
      { label: 'Schedule a viewing', to: '/contact?subject=Buying%20a%20property' },
      { label: 'Request a valuation', to: '/contact?subject=Valuation%20request' },
      { label: 'Relocation services', to: '/services#relocation-services' },
    ],
  },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-navy-950 text-navy-200">
      <div className="shell">
        <div className="grid gap-12 py-16 md:py-20 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <Link to="/" aria-label={`${site.name} — home`} className="inline-block">
              <BrandMark tone="light" />
            </Link>
            <p className="mt-6 max-w-sm text-[14px] leading-relaxed text-navy-300">
              {site.description}
            </p>

            <ul className="mt-7 flex items-center gap-2.5">
              {site.social.map((item) => {
                const Icon = SOCIAL_ICONS[item.icon];
                return (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      aria-label={`${site.name} on ${item.label}`}
                      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-navy-200 transition-all duration-300 ease-premium hover:border-champagne-400 hover:bg-champagne-400 hover:text-ink"
                    >
                      {Icon ? (
                        <Icon aria-hidden="true" className="h-[15px] w-[15px]" strokeWidth={1.8} />
                      ) : null}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          {columns.map((column) => (
            <nav key={column.title} aria-label={column.title} className="lg:col-span-2">
              <h2 className="font-display text-[11px] font-semibold uppercase tracking-[0.24em] text-white">
                {column.title}
              </h2>
              <ul className="mt-5 space-y-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="text-[13.5px] text-navy-300 transition-colors duration-300 hover:text-champagne-300"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div className="lg:col-span-2">
            <h2 className="font-display text-[11px] font-semibold uppercase tracking-[0.24em] text-white">
              Contact
            </h2>
            <ul className="mt-5 space-y-4 text-[13.5px] text-navy-300">
              <li>
                <a
                  href={site.phoneHref}
                  className="flex items-start gap-2.5 transition-colors duration-300 hover:text-champagne-300"
                >
                  <Phone aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-champagne-400" strokeWidth={1.7} />
                  {site.phone}
                </a>
              </li>
              <li>
                <a
                  href={site.emailHref}
                  className="flex items-start gap-2.5 transition-colors duration-300 hover:text-champagne-300"
                >
                  <Mail aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-champagne-400" strokeWidth={1.7} />
                  <span className="break-all">{site.email}</span>
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-champagne-400" strokeWidth={1.7} />
                <span>
                  {site.address.line1}
                  <br />
                  {site.address.line2}
                </span>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h2 className="font-display text-[11px] font-semibold uppercase tracking-[0.24em] text-white">
              Newsletter
            </h2>
            <div className="mt-5">
              <NewsletterForm />
            </div>
          </div>
        </div>

        <div className="flex flex-col items-start justify-between gap-5 border-t border-white/10 py-7 sm:flex-row sm:items-center">
          <p className="text-[12.5px] text-navy-400">
            &copy; {year} {site.legalName}. All rights reserved.
          </p>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="group inline-flex items-center gap-2 font-display text-[11px] font-semibold uppercase tracking-[0.2em] text-navy-300 transition-colors duration-300 hover:text-white"
          >
            Back to top
            <ArrowUp
              aria-hidden="true"
              className="h-3.5 w-3.5 transition-transform duration-300 ease-premium group-hover:-translate-y-0.5"
              strokeWidth={2}
            />
          </button>
        </div>
      </div>
    </footer>
  );
}

import { Link } from 'react-router-dom';
import { Mail, MapPin, Phone } from 'lucide-react';
import { footerColumns, legalLinks, site } from '../../data/site.js';
import SocialLinks from './SocialLinks.jsx';

function ColumnHeading({ children }) {
  return (
    <h3 className="text-[13px] font-semibold uppercase tracking-[0.16em] text-ink">
      {children}
      <span aria-hidden="true" className="mt-3 block h-[2px] w-8 bg-brand-500" />
    </h3>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line/70 bg-footer">
      <div className="shell grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
        {footerColumns.map((column) => (
          <nav key={column.title} aria-label={column.title}>
            <ColumnHeading>{column.title}</ColumnHeading>
            <ul className="mt-6 space-y-3">
              {column.links.map((link) => (
                <li key={link.href + link.label}>
                  <Link
                    to={link.href}
                    className="text-[12.5px] text-muted transition-colors duration-200 ease-premium hover:text-brand-500"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}

        <div>
          <ColumnHeading>Company information</ColumnHeading>
          <img src={site.logo} alt={site.logoAlt} className="mt-6 h-12 w-auto" />
          <p className="mt-4 max-w-xs text-[12.5px] leading-relaxed text-muted">
            {site.name} is committed to professional bitumen supply, dependable industrial solutions,
            and long-term business relationships.
          </p>
          <ul className="mt-5 space-y-3 text-[12.5px] text-muted">
            <li>
              <a href={site.phone.href} className="flex items-center gap-2.5 transition-colors duration-200 ease-premium hover:text-brand-500">
                <Phone className="h-3.5 w-3.5 shrink-0 text-brand-500" strokeWidth={1.8} aria-hidden="true" />
                {site.phone.label}
              </a>
            </li>
            <li>
              <a href={site.email.href} className="flex items-center gap-2.5 transition-colors duration-200 ease-premium hover:text-brand-500">
                <Mail className="h-3.5 w-3.5 shrink-0 text-brand-500" strokeWidth={1.8} aria-hidden="true" />
                {site.email.label}
              </a>
            </li>
            <li className="flex items-start gap-2.5">
              <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-500" strokeWidth={1.8} aria-hidden="true" />
              {site.address}
            </li>
            <li className="pl-6 text-faint">{site.website}</li>
          </ul>
          <SocialLinks className="mt-5" linkClassName="border border-line p-2" />
        </div>
      </div>

      <div className="border-t border-hairline">
        <div className="shell flex flex-col gap-4 py-5 text-[11.5px] text-faint sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} {site.name} All rights reserved.</p>
          <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {legalLinks.map((link) => (
              <li key={link.href}>
                <Link
                  to={link.href}
                  className="transition-colors duration-200 ease-premium hover:text-brand-500"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}

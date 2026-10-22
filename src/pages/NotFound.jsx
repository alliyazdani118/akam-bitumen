import { Link } from 'react-router-dom';
import Button from '../components/ui/Button.jsx';
import SectionLabel from '../components/ui/SectionLabel.jsx';
import { services } from '../data/services.js';
import useDocumentTitle from '../hooks/useDocumentTitle.js';

export default function NotFound() {
  useDocumentTitle('Page not found');

  return (
    <section className="bg-base py-16 lg:py-24">
      <div className="shell max-w-3xl">
        <SectionLabel withLine>Error 404</SectionLabel>
        <h1 className="mt-4 text-[30px] font-bold leading-tight text-ink sm:text-[36px]">
          That page could not be found
        </h1>
        <p className="mt-4 text-[14px] leading-relaxed text-muted">
          The link may be out of date, or the page may have moved. The service pages below, or the
          home page, are the quickest way back.
        </p>

        <div className="mt-7 flex flex-wrap gap-3">
          <Button to="/">Back to home</Button>
          <Button to="/contact" variant="outline">
            Contact us
          </Button>
        </div>

        <h2 className="mt-12 text-[13px] font-semibold uppercase tracking-[0.14em] text-ink">
          Our services
        </h2>
        <ul className="mt-5 grid gap-3 sm:grid-cols-2">
          {services.map((service) => (
            <li key={service.slug}>
              <Link
                to={`/services/${service.slug}`}
                className="flex items-center justify-between gap-4 border border-line/70 bg-card px-4 py-3 text-[13px] text-muted transition-colors duration-200 ease-premium hover:border-brand-500 hover:text-brand-500"
              >
                {service.title}
                <span aria-hidden="true" className="text-brand-500">
                  →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

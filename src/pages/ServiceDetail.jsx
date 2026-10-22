import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Check } from 'lucide-react';
import PageHero from '../components/layout/PageHero.jsx';
import CtaBanner from '../components/layout/CtaBanner.jsx';
import Button from '../components/ui/Button.jsx';
import Icon from '../components/ui/Icon.jsx';
import SectionLabel from '../components/ui/SectionLabel.jsx';
import { getServiceBySlug, services } from '../data/services.js';
import { site } from '../data/site.js';
import useDocumentTitle from '../hooks/useDocumentTitle.js';
import NotFound from './NotFound.jsx';

export default function ServiceDetail() {
  const { slug } = useParams();
  const service = getServiceBySlug(slug);
  useDocumentTitle(service ? service.title : 'Page not found', service?.summary);

  if (!service) return <NotFound />;

  const others = services.filter((item) => item.slug !== service.slug);

  return (
    <>
      <PageHero
        eyebrow="Services"
        title={service.title}
        description={service.summary}
        image="facility"
      />

      <section className="bg-base py-12 lg:py-[60px]">
        <div className="shell grid gap-12 lg:grid-cols-[minmax(0,1.65fr)_minmax(0,1fr)] lg:gap-14">
          <div>
            <Link
              to="/services"
              className="inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.14em] text-faint transition-colors duration-200 ease-premium hover:text-brand-500"
            >
              <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
              Back to all services
            </Link>

            <p className="mt-6 text-[15px] leading-relaxed text-muted lg:text-[16px]">
              {service.intro}
            </p>

            {service.overview.map((paragraph) => (
              <p key={paragraph.slice(0, 24)} className="mt-4 text-[13.5px] leading-relaxed text-muted">
                {paragraph}
              </p>
            ))}

            <h2 className="mt-10 text-[20px] font-bold text-ink">What this service covers</h2>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {service.points.map((point) => (
                <li key={point} className="flex items-start gap-3 border border-line/60 bg-card p-4">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-500" aria-hidden="true" />
                  <span className="text-[13px] leading-relaxed text-muted">{point}</span>
                </li>
              ))}
            </ul>

            <div className="mt-10 border border-line/60 bg-surface p-6">
              <SectionLabel withLine>How an enquiry works</SectionLabel>
              <ol className="mt-5 grid gap-4 sm:grid-cols-3">
                {[
                  { step: '01', title: 'You send the requirement', body: 'Specification, volume, delivery point and timing.' },
                  { step: '02', title: 'We confirm the supply', body: 'What can be supplied, at what specification, and when.' },
                  { step: '03', title: 'Supply is scheduled', body: 'Documents, packing and transport planned to the date agreed.' },
                ].map((item) => (
                  <li key={item.step}>
                    <span className="text-[11px] font-bold tracking-[0.2em] text-brand-500">
                      {item.step}
                    </span>
                    <h3 className="mt-2 text-[14px] font-semibold text-ink">{item.title}</h3>
                    <p className="mt-1.5 text-[12.5px] leading-relaxed text-muted">{item.body}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          <aside className="space-y-6 lg:sticky lg:top-32 lg:self-start">
            <div className="panel p-6">
              <span className="flex h-12 w-12 items-center justify-center border border-brand-500/30 bg-brand-500/10 text-brand-500">
                <Icon name={service.icon} className="h-6 w-6" />
              </span>
              <h2 className="mt-5 text-[17px] font-semibold text-ink">Enquire about {service.title}</h2>
              <p className="mt-2 text-[12.5px] leading-relaxed text-muted">
                Send your requirement and we will come back with what can be supplied.
              </p>
              <Button to="/contact#request-a-quote" className="mt-5 w-full">
                Request a quote
              </Button>
              <ul className="mt-4 space-y-2 text-[12.5px] text-muted">
                <li>
                  <a href={site.phone.href} className="transition-colors duration-200 ease-premium hover:text-brand-500">
                    {site.phone.label}
                  </a>
                </li>
                <li>
                  <a href={site.email.href} className="transition-colors duration-200 ease-premium hover:text-brand-500">
                    {site.email.label}
                  </a>
                </li>
              </ul>
            </div>

            <nav aria-label="Other services" className="border border-line/60 bg-card p-6">
              <h2 className="text-[13px] font-semibold uppercase tracking-[0.14em] text-ink">
                Other services
              </h2>
              <ul className="mt-4 space-y-3">
                {others.map((item) => (
                  <li key={item.slug}>
                    <Link
                      to={`/services/${item.slug}`}
                      className="flex items-center gap-2.5 text-[13px] text-muted transition-colors duration-200 ease-premium hover:text-brand-500"
                    >
                      <Icon name={item.icon} className="h-4 w-4 shrink-0 text-brand-500" />
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}

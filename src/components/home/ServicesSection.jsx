import { servicesIntro } from '../../data/content.js';
import { services } from '../../data/services.js';
import Reveal from '../ui/Reveal.jsx';
import ServiceCard from '../services/ServiceCard.jsx';

/** Services section: two-column heading, then a 3 × 2 card grid. */
export default function ServicesSection({ id = 'services', className = '' }) {
  return (
    <section id={id} aria-labelledby={`${id}-heading`} className={`bg-base py-12 lg:py-[60px] ${className}`}>
      <div className="shell">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.02fr)] lg:items-start lg:gap-14">
          <Reveal className="flex gap-4">
            <span aria-hidden="true" className="mt-1 h-[calc(100%-0.5rem)] min-h-[44px] w-[3px] shrink-0 bg-brand-500" />
            <h2
              id={`${id}-heading`}
              className="text-[26px] font-bold leading-tight text-ink sm:text-[29px] lg:text-[32px]"
            >
              {servicesIntro.title}
            </h2>
          </Reveal>
          <Reveal delay={80} className="lg:pt-1">
            <p className="text-[13.5px] leading-relaxed text-muted lg:text-[14px]">
              {servicesIntro.description}
            </p>
          </Reveal>
        </div>

        <div className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <Reveal key={service.slug} delay={index * 60} className="h-full">
              <ServiceCard service={service} highlight={index === 0} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

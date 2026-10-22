import { ArrowRight, Building2, Compass, Megaphone, Plane, Scale, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { services } from '../../data/site.js';
import Reveal from '../ui/Reveal.jsx';
import SectionHeading from '../ui/SectionHeading.jsx';

const ICONS = {
  building: Building2,
  chart: TrendingUp,
  megaphone: Megaphone,
  compass: Compass,
  scale: Scale,
  plane: Plane,
};

/** Six services presented as a hairline grid — closer to a drawing than to SaaS cards. */
export default function ServicesSection() {
  return (
    <section className="section bg-mist" aria-labelledby="services-title">
      <div className="shell">
        <Reveal>
          <SectionHeading
            align="center"
            eyebrow="Our Services"
            title="What We Do"
            copy="Advice, representation and marketing for people buying, selling and holding significant property."
          />
        </Reveal>

        <div className="mt-12 overflow-hidden rounded-card border border-line bg-line lg:mt-14">
          <ul className="grid gap-px sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => {
              const Icon = ICONS[service.icon];
              return (
                <li key={service.id} className="bg-white">
                  <Reveal delay={index * 60} className="h-full">
                    <Link
                      to={`/services#${service.id}`}
                      className="group flex h-full flex-col p-7 transition-colors duration-500 ease-premium hover:bg-paper lg:p-8"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <span className="font-display text-[12px] font-bold tracking-[0.22em] text-champagne-500">
                          {service.index}
                        </span>
                        {Icon ? (
                          <Icon
                            aria-hidden="true"
                            className="h-7 w-7 text-navy-300 transition-colors duration-500 group-hover:text-champagne-500"
                            strokeWidth={1.3}
                          />
                        ) : null}
                      </div>

                      <h3 className="mt-8 font-display text-[19px] font-bold leading-snug tracking-[-0.01em] text-ink">
                        {service.title}
                      </h3>
                      <p className="mt-3 flex-1 text-[14.5px] leading-relaxed text-navy-500">
                        {service.summary}
                      </p>
                      <span className="mt-7 inline-flex items-center gap-2 font-display text-[11px] font-semibold uppercase tracking-[0.18em] text-navy-400 transition-colors duration-300 group-hover:text-champagne-600">
                        Learn more
                        <ArrowRight
                          aria-hidden="true"
                          className="h-3.5 w-3.5 transition-transform duration-300 ease-premium group-hover:translate-x-1"
                          strokeWidth={2}
                        />
                      </span>
                    </Link>
                  </Reveal>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}

import { ArrowRight, Check } from 'lucide-react';
import PageHero from '../components/layout/PageHero.jsx';
import CtaSection from '../components/home/CtaSection.jsx';
import Button from '../components/ui/Button.jsx';
import Reveal from '../components/ui/Reveal.jsx';
import { services } from '../data/site.js';
import { photo, photoSrcSet } from '../lib/images.js';

export default function Services() {
  return (
    <>
      <PageHero
        eyebrow="Our Services"
        title="Advice, representation and marketing"
        copy="Six services covering every stage of buying, selling and holding significant property — delivered by the same advisors from start to finish."
        imageId="photo-1497366754035-f200968a6e72"
        breadcrumb={[{ label: 'Services' }]}
      />

      <section className="section bg-paper">
        <div className="shell space-y-24 lg:space-y-32">
          {services.map((service, index) => {
            const reversed = index % 2 === 1;
            return (
              <article
                key={service.id}
                id={service.id}
                className="grid scroll-mt-28 items-center gap-10 lg:grid-cols-2 lg:gap-16"
              >
                <Reveal className={reversed ? 'lg:order-2' : ''}>
                  <div className="media zoomable aspect-[4/3]">
                    <img
                      src={photo(service.image, 1280)}
                      srcSet={photoSrcSet(service.image)}
                      sizes="(min-width: 1024px) 46vw, 92vw"
                      alt={`${service.title} — ${service.summary}`}
                      width={1280}
                      height={960}
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                </Reveal>

                <Reveal delay={120} className={reversed ? 'lg:order-1' : ''}>
                  <span className="font-display text-[12px] font-bold tracking-[0.22em] text-champagne-500">
                    {service.index}
                  </span>
                  <h2 className="mt-4 font-display text-[clamp(1.5rem,2.8vw,2.05rem)] font-bold leading-[1.16] tracking-[-0.025em] text-ink">
                    {service.title}
                  </h2>
                  <p className="body-lg mt-5">{service.description}</p>

                  <ul className="mt-8 grid gap-3">
                    {service.includes.map((item) => (
                      <li key={item} className="flex gap-3">
                        <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-champagne-100 text-champagne-600">
                          <Check aria-hidden="true" className="h-3 w-3" strokeWidth={2.6} />
                        </span>
                        <span className="text-[14.5px] leading-relaxed text-navy-600">{item}</span>
                      </li>
                    ))}
                  </ul>

                  <Button to="/contact" variant="outlineDark" icon={ArrowRight} className="mt-9">
                    Enquire about this service
                  </Button>
                </Reveal>
              </article>
            );
          })}
        </div>
      </section>

      <CtaSection />
    </>
  );
}

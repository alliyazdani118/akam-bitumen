import PageHero from '../components/layout/PageHero.jsx';
import CtaBanner from '../components/layout/CtaBanner.jsx';
import NewsletterBanner from '../components/layout/NewsletterBanner.jsx';
import ServiceCard from '../components/services/ServiceCard.jsx';
import Reveal from '../components/ui/Reveal.jsx';
import SectionLabel from '../components/ui/SectionLabel.jsx';
import { services } from '../data/services.js';
import useDocumentTitle from '../hooks/useDocumentTitle.js';

export default function Services() {
  useDocumentTitle(
    'Services',
    'Bitumen supply, petroleum products, industrial solutions, road construction, export and logistics, and bulk supply from AKAM BITUMEN CO.',
  );

  return (
    <>
      <PageHero
        eyebrow="AKAM BITUMEN CO."
        title="Our Services"
        description="Six supply services built around one requirement: material that arrives when the programme needs it, at the specification that was agreed."
        image="facility"
      />

      <section aria-labelledby="services-list-heading" className="bg-base py-12 lg:py-[60px]">
        <div className="shell">
          <SectionLabel withLine>What we do</SectionLabel>
          <h2
            id="services-list-heading"
            className="mt-4 max-w-2xl text-[26px] font-bold leading-tight text-ink sm:text-[29px] lg:text-[32px]"
          >
            Reliable bitumen for a stronger tomorrow
          </h2>
          <p className="mt-4 max-w-3xl text-[13.5px] leading-relaxed text-muted">
            Each service can be used on its own, or combined into one supply arrangement where a
            project, a distribution business or an industrial site needs several lines of material
            coordinated together.
          </p>

          <div className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => (
              <Reveal
                key={service.slug}
                delay={index * 50}
                className="h-full scroll-mt-36"
              >
                <div id={service.slug} className="h-full scroll-mt-36">
                  <ServiceCard service={service} highlight={index === 0} />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <NewsletterBanner />
      <CtaBanner />
    </>
  );
}

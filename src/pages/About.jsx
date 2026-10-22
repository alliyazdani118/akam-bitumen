import PageHero from '../components/layout/PageHero.jsx';
import CtaBanner from '../components/layout/CtaBanner.jsx';
import WhyChooseUs from '../components/home/WhyChooseUs.jsx';
import StatsBanner from '../components/home/StatsBanner.jsx';
import Reveal from '../components/ui/Reveal.jsx';
import Icon from '../components/ui/Icon.jsx';
import SectionLabel from '../components/ui/SectionLabel.jsx';
import { about } from '../data/content.js';
import { site } from '../data/site.js';
import useDocumentTitle from '../hooks/useDocumentTitle.js';

export default function About() {
  useDocumentTitle(
    'About Us',
    'AKAM BITUMEN CO. supplies bitumen and petroleum products for road construction, infrastructure and industrial customers.',
  );

  return (
    <>
      <PageHero
        eyebrow="About Us"
        title="Company overview"
        description="A supply business built around confirmed specifications, honest lead times and coordination that does not need chasing."
        image="pipes"
      />

      <section id="company-overview" className="scroll-mt-36 bg-base py-12 lg:py-[60px]">
        <div className="shell grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16">
          <Reveal>
            <SectionLabel withLine>Who we are</SectionLabel>
            <h2 className="mt-4 text-[26px] font-bold leading-tight text-ink sm:text-[29px] lg:text-[32px]">
              Bitumen and petroleum supply for infrastructure and industry
            </h2>
          </Reveal>
          <Reveal delay={80}>
            {about.overview.map((paragraph, index) => (
              <p
                key={paragraph.slice(0, 24)}
                className={`text-[13.5px] leading-relaxed text-muted lg:text-[14px] ${
                  index > 0 ? 'mt-4' : ''
                }`}
              >
                {paragraph}
              </p>
            ))}
            <dl className="mt-8 grid gap-5 sm:grid-cols-2">
              <div className="border border-line/60 bg-card p-5">
                <dt className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-500">
                  Head office
                </dt>
                <dd className="mt-2 text-[13px] text-muted">{site.address}</dd>
              </div>
              <div className="border border-line/60 bg-card p-5">
                <dt className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-500">
                  Enquiries
                </dt>
                <dd className="mt-2 space-y-1 text-[13px] text-muted">
                  <a href={site.phone.href} className="block transition-colors duration-200 ease-premium hover:text-brand-500">
                    {site.phone.label}
                  </a>
                  <a href={site.email.href} className="block transition-colors duration-200 ease-premium hover:text-brand-500">
                    {site.email.label}
                  </a>
                </dd>
              </div>
            </dl>
          </Reveal>
        </div>
      </section>

      <section id="mission" className="scroll-mt-36 border-y border-hairline bg-surface py-12 lg:py-14">
        <div className="shell grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] lg:gap-16">
          <Reveal>
            <SectionLabel withLine>Our mission</SectionLabel>
            <h2 className="mt-4 text-[24px] font-bold leading-tight text-ink sm:text-[28px]">
              {about.mission.title}
            </h2>
          </Reveal>
          <Reveal delay={80}>
            {about.mission.body.map((paragraph, index) => (
              <p key={paragraph.slice(0, 24)} className={`text-[13.5px] leading-relaxed text-muted ${index > 0 ? 'mt-4' : ''}`}>
                {paragraph}
              </p>
            ))}
          </Reveal>
        </div>
      </section>

      <section id="values" className="scroll-mt-36 bg-base py-12 lg:py-[60px]">
        <div className="shell">
          <SectionLabel withLine>Our values</SectionLabel>
          <h2 className="mt-4 max-w-2xl text-[26px] font-bold leading-tight text-ink sm:text-[29px] lg:text-[32px]">
            How we work with customers and suppliers
          </h2>

          <div className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {about.values.map((value, index) => (
              <Reveal key={value.title} delay={index * 60} className="h-full">
                <div className="h-full border border-line/70 bg-card p-5">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full border border-brand-500/30 bg-brand-500/10 text-brand-500">
                    <Icon name={value.icon} className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 text-[15px] font-semibold text-ink">{value.title}</h3>
                  <p className="mt-2 text-[12.5px] leading-relaxed text-muted">{value.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <WhyChooseUs />
      <StatsBanner />
      <CtaBanner />
    </>
  );
}

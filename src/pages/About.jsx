import { ArrowRight, Check } from 'lucide-react';
import PageHero from '../components/layout/PageHero.jsx';
import CtaSection from '../components/home/CtaSection.jsx';
import TeamSection from '../components/home/TeamSection.jsx';
import TestimonialsSection from '../components/home/TestimonialsSection.jsx';
import Button from '../components/ui/Button.jsx';
import Reveal from '../components/ui/Reveal.jsx';
import { achievements, site, whyHorizon } from '../data/site.js';
import { photo, photoSrcSet } from '../lib/images.js';

const STORY_IMAGE = 'photo-1613490493576-7fde63acd811';

export default function About() {
  return (
    <>
      <PageHero
        eyebrow="About Us"
        title="Extraordinary homes, handled properly"
        copy={`${site.name} has represented buyers, sellers and investors since ${site.founded}. We are deliberately small, unusually thorough, and easy to reach.`}
        imageId="photo-1600607687939-ce8a6c25118c"
        breadcrumb={[{ label: 'About Us' }]}
      />

      <section className="section bg-paper" aria-labelledby="story-title">
        <div className="shell grid items-start gap-14 lg:grid-cols-2 lg:gap-20">
          <Reveal className="max-w-xl">
            <p className="eyebrow">Our Story</p>
            <h2 id="story-title" className="section-title mt-5">
              Built around the property, not the transaction
            </h2>
            <div className="mt-7 space-y-5 text-[15.5px] leading-[1.8] text-navy-500">
              <p>
                Horizon began in 2009 with a single instruction and a simple idea: that
                significant property deserves more than a listing and a signboard. We built the
                agency around the way a house is actually presented, negotiated and sold — which
                meant photography before marketing, valuation before pricing, and an advisor who
                stays with the file from first viewing to completion.
              </p>
              <p>
                Sixteen years later we still take on fewer instructions than we are offered. Each
                property gets a campaign written for it, a buyer profile researched for it, and an
                advisor who can answer a question without conferring.
              </p>
              <p>
                For investors, that same discipline shows up as underwriting: yield, holding cost
                and exit modelled before a client commits, not after.
              </p>
            </div>

            <Button to="/contact" variant="primary" icon={ArrowRight} className="mt-9">
              Work with us
            </Button>
          </Reveal>

          <Reveal delay={120}>
            <div className="media zoomable aspect-[4/5]">
              <img
                src={photo(STORY_IMAGE, 1280)}
                srcSet={photoSrcSet(STORY_IMAGE)}
                sizes="(min-width: 1024px) 46vw, 92vw"
                alt="A modern glass-fronted villa with a pool at golden hour"
                width={1280}
                height={1600}
                loading="lazy"
                decoding="async"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-navy-950 py-16 md:py-20" aria-label="Horizon by the numbers">
        <div className="shell">
          <dl className="grid grid-cols-2 gap-x-8 gap-y-10 lg:grid-cols-4">
            {achievements.map((item, index) => (
              <Reveal key={item.label} delay={index * 70}>
                <div className="border-l border-white/15 pl-5">
                  <dt className="font-display text-[10.5px] font-semibold uppercase tracking-[0.2em] text-navy-300">
                    {item.label}
                  </dt>
                  <dd className="mt-2 font-display text-[clamp(1.75rem,3.4vw,2.5rem)] font-extrabold tracking-[-0.025em] text-white">
                    {item.value}
                  </dd>
                </div>
              </Reveal>
            ))}
          </dl>
        </div>
      </section>

      <section className="section bg-white" aria-labelledby="values-title">
        <div className="shell">
          <Reveal className="max-w-2xl">
            <p className="eyebrow">How We Work</p>
            <h2 id="values-title" className="section-title mt-5">
              Three principles we don&rsquo;t negotiate on
            </h2>
          </Reveal>

          <ul className="mt-12 grid gap-8 lg:mt-14 lg:grid-cols-3 lg:gap-6">
            {whyHorizon.map((item, index) => (
              <li key={item.id}>
                <Reveal delay={index * 90} className="h-full">
                  <div className="flex h-full flex-col rounded-card border border-line bg-paper p-7 transition-all duration-500 ease-premium hover:-translate-y-1 hover:bg-white hover:shadow-card">
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-champagne-300 bg-white text-champagne-600">
                      <Check aria-hidden="true" className="h-4 w-4" strokeWidth={2.2} />
                    </span>
                    <h3 className="mt-6 font-display text-[19px] font-bold tracking-[-0.01em] text-ink">
                      {item.label}
                    </h3>
                    <p className="mt-3 text-[14.5px] leading-relaxed text-navy-500">{item.text}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <TestimonialsSection />
      <TeamSection />
      <CtaSection />
    </>
  );
}

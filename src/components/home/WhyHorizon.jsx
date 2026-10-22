import { ArrowRight, Check } from 'lucide-react';
import { achievements, stats, statsImageId, whyHorizon, whyImageId } from '../../data/site.js';
import { photo, photoSrcSet } from '../../lib/images.js';
import Button from '../ui/Button.jsx';
import Reveal from '../ui/Reveal.jsx';
import SectionHeading from '../ui/SectionHeading.jsx';
import StatRing from '../ui/StatRing.jsx';

/**
 * "Why Choose Horizon": a split editorial block, then a dark performance band
 * carrying the circular indicators and the primary call to action.
 */
export default function WhyHorizon() {
  return (
    <section className="bg-paper" aria-labelledby="why-horizon-title">
      <div className="shell section">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <Reveal className="order-2 lg:order-1">
            <div className="media zoomable aspect-[4/5] lg:aspect-[5/6]">
              <img
                src={photo(whyImageId, 1280)}
                srcSet={photoSrcSet(whyImageId)}
                sizes="(min-width: 1024px) 46vw, 92vw"
                alt="A contemporary living room opening through sliding glass onto a terrace"
                width={1280}
                height={1536}
                loading="lazy"
                decoding="async"
              />
            </div>
          </Reveal>

          <Reveal delay={120} className="order-1 max-w-xl lg:order-2">
            <p className="eyebrow">Why Choose Horizon</p>
            <h2 id="why-horizon-title" className="section-title mt-5">
              Representation that treats a house as a house, not a listing
            </h2>
            <p className="body-lg mt-6">
              We are a small agency by choice. That means fewer clients, deeper knowledge of each
              property, and an advisor who can answer a question without checking with anyone.
            </p>

            <ul className="mt-9 space-y-7">
              {whyHorizon.map((item) => (
                <li key={item.id} className="flex gap-4">
                  <span className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-champagne-300 bg-champagne-50 text-champagne-600">
                    <Check aria-hidden="true" className="h-4 w-4" strokeWidth={2.2} />
                  </span>
                  <div>
                    <h3 className="font-display text-[16px] font-bold text-ink">{item.label}</h3>
                    <p className="mt-1.5 text-[14.5px] leading-relaxed text-navy-500">{item.text}</p>
                  </div>
                </li>
              ))}
            </ul>

            <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-6 border-t border-line pt-8 sm:grid-cols-4 lg:grid-cols-2">
              {achievements.map((item) => (
                <div key={item.label}>
                  <dt className="sr-only">{item.label}</dt>
                  <dd>
                    <span className="block font-display text-[26px] font-extrabold tracking-[-0.02em] text-ink">
                      {item.value}
                    </span>
                    <span className="mt-1 block text-[12.5px] uppercase tracking-[0.12em] text-navy-400">
                      {item.label}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>

      {/* Performance band */}
      <div className="relative isolate overflow-hidden bg-navy-950">
        <img
          src={photo(statsImageId, 1920)}
          srcSet={photoSrcSet(statsImageId, [1280, 1600, 1920, 2400])}
          sizes="100vw"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 -z-20 h-full w-full object-cover"
          loading="lazy"
          decoding="async"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-gradient-to-r from-navy-950/95 via-navy-950/90 to-navy-950/70"
        />

        <div className="shell py-20 md:py-24">
          <div className="grid gap-14 lg:grid-cols-[1fr_1.15fr] lg:items-center lg:gap-16">
            <Reveal>
              <p className="eyebrow text-champagne-300">Our Performance</p>
              <h2 className="mt-5 font-display text-[clamp(1.9rem,3.6vw,2.7rem)] font-extrabold leading-[1.12] tracking-[-0.025em] text-white">
                Let&rsquo;s be great together
              </h2>
              <p className="mt-5 max-w-md text-[16px] leading-[1.75] text-navy-200">
                The numbers we are happy to be judged on — measured across every instruction we
                have taken since 2009.
              </p>
              <Button to="/about" variant="gold" icon={ArrowRight} className="mt-9">
                Discover more
              </Button>
            </Reveal>

            <Reveal delay={120}>
              <ul className="grid grid-cols-2 gap-x-6 gap-y-12 sm:gap-y-14 lg:grid-cols-4 lg:gap-x-4">
                {stats.map((stat, index) => (
                  <li key={stat.label} className={index % 2 === 1 ? 'sm:translate-y-6' : undefined}>
                    <StatRing value={stat.value} label={stat.label} size={116} />
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

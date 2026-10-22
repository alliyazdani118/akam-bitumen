import { ArrowRight } from 'lucide-react';
import { heroImageId, site } from '../../data/site.js';
import { photo, photoSrcSet } from '../../lib/images.js';
import Button from '../ui/Button.jsx';
import HeroSearch from './HeroSearch.jsx';

/**
 * Full-bleed hero: architectural photograph, navy overlay for legibility,
 * centred headline in the upper-middle of the viewport, and a working search
 * bar anchoring the bottom of the frame.
 */
export default function Hero() {
  return (
    <section className="relative isolate flex min-h-[640px] flex-col justify-between overflow-hidden bg-navy-950 pt-[104px] sm:min-h-[720px] lg:min-h-[100svh]">
      <img
        src={photo(heroImageId, 2400)}
        srcSet={photoSrcSet(heroImageId, [960, 1280, 1600, 2000, 2400])}
        sizes="100vw"
        alt="A modern glass-walled villa with an infinity pool at blue hour"
        width={2400}
        height={1600}
        className="absolute inset-0 -z-20 h-full w-full animate-hero-scale object-cover"
        loading="eager"
        decoding="async"
        fetchpriority="high"
      />

      {/* Overlay: darker at the top for the header and at the base for the search bar. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-b from-navy-950/90 via-navy-950/50 to-navy-950/95"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(120%_80%_at_50%_15%,rgba(7,21,38,0)_0%,rgba(7,21,38,0.55)_100%)]"
      />

      <div className="shell flex flex-1 items-center">
        <div className="mx-auto w-full max-w-3xl pb-10 pt-16 text-center sm:pt-20">
          <p
            className="eyebrow eyebrow--center animate-fade-up text-champagne-300"
            style={{ animationDelay: '0.05s' }}
          >
            Luxury real estate since {site.founded}
          </p>

          <h1
            className="mt-6 font-display text-[clamp(2.35rem,6.4vw,4.6rem)] font-extrabold leading-[1.04] tracking-[-0.035em] text-white text-shadow-hero animate-fade-up"
            style={{ animationDelay: '0.14s' }}
          >
            Discover Exceptional
            <br />
            Homes &amp; Investments
          </h1>

          <p
            className="mx-auto mt-6 max-w-xl text-[16px] leading-[1.75] text-white/85 sm:text-[17.5px] animate-fade-up"
            style={{ animationDelay: '0.24s' }}
          >
            Premium properties in prime locations. Find your dream home or the perfect
            investment with confidence.
          </p>

          <div
            className="mt-9 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center animate-fade-up"
            style={{ animationDelay: '0.34s' }}
          >
            <Button to="/properties" variant="gold" icon={ArrowRight}>
              Browse properties
            </Button>
            <Button to="/contact" variant="outlineLight">
              Book a consultation
            </Button>
          </div>
        </div>
      </div>

      <div
        className="shell pb-9 sm:pb-11 animate-fade-up"
        style={{ animationDelay: '0.44s' }}
      >
        <HeroSearch />
      </div>
    </section>
  );
}

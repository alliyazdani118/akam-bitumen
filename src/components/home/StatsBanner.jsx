import { statsBanner, statistics } from '../../data/content.js';
import { photoUrl } from '../../lib/images.js';
import Button from '../ui/Button.jsx';
import SectionLabel from '../ui/SectionLabel.jsx';
import StatRing from '../ui/StatRing.jsx';

/** Full-width industrial banner: copy and CTA on the left, statistics right. */
export default function StatsBanner() {
  return (
    <section
      aria-labelledby="stats-heading"
      className="relative isolate overflow-hidden border-y border-line/60 bg-deep"
    >
      <img
        src={photoUrl('refinery', { w: 1920, q: 76 })}
        alt=""
        aria-hidden="true"
        loading="lazy"
        className="absolute inset-0 -z-20 h-full w-full object-cover object-center"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-r from-[#070A0C]/96 via-[#070A0C]/88 to-[#070A0C]/70"
      />

      <div className="shell grid gap-10 py-14 lg:grid-cols-2 lg:items-center lg:gap-16 lg:py-16">
        <div>
          <SectionLabel withLine>{statsBanner.eyebrow}</SectionLabel>
          <h2
            id="stats-heading"
            className="mt-4 text-[26px] font-bold leading-tight text-ink sm:text-[29px] lg:text-[32px]"
          >
            {statsBanner.title}
          </h2>
          <p className="mt-4 max-w-xl text-[13.5px] leading-relaxed text-muted lg:text-[14px]">
            {statsBanner.description}
          </p>
          <Button to={statsBanner.cta.href} className="mt-7">
            {statsBanner.cta.label}
          </Button>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:gap-7">
          {statistics.map((stat) => (
            <StatRing key={stat.label} {...stat} />
          ))}
        </div>
      </div>
    </section>
  );
}

import { whyChooseUs } from '../../data/content.js';
import { photoSource } from '../../lib/images.js';
import Icon from '../ui/Icon.jsx';
import Reveal from '../ui/Reveal.jsx';
import SectionLabel from '../ui/SectionLabel.jsx';

const largeSource = photoSource('pipes', { widths: [640, 960, 1280] });
const smallSource = photoSource('pumpjack', { widths: [480, 720, 960] });

/** Two-column section: layered industrial photography beside the feature list. */
export default function WhyChooseUs({ id = 'why-choose-us', className = '' }) {
  const { eyebrow, title, description, features } = whyChooseUs;

  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className={`bg-base py-14 lg:py-[70px] ${className}`}
    >
      <div className="shell grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
        <Reveal className="relative pb-4 sm:pb-10 sm:pr-6">
          <div className="relative aspect-[4/3] overflow-hidden border border-line/70">
            <img
              {...largeSource}
              sizes="(min-width: 1024px) 45vw, 90vw"
              alt={whyChooseUs.image.large.alt}
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </div>

          {/* Thin orange corner accents on the main photograph */}
          <span aria-hidden="true" className="absolute left-0 top-0 h-16 w-[3px] bg-brand-500" />
          <span aria-hidden="true" className="absolute left-0 top-0 h-[3px] w-24 bg-brand-500" />

          <div className="mt-4 border-2 border-base sm:absolute sm:-bottom-0 sm:-right-0 sm:mt-0 sm:w-[46%] sm:border-4">
            <img
              {...smallSource}
              sizes="(min-width: 1024px) 22vw, 60vw"
              alt={whyChooseUs.image.small.alt}
              loading="lazy"
              className="aspect-[4/3] w-full object-cover"
            />
          </div>
        </Reveal>

        <Reveal delay={80}>
          <SectionLabel withLine>{eyebrow}</SectionLabel>
          <h2
            id={`${id}-heading`}
            className="mt-4 text-[26px] font-bold leading-tight text-ink sm:text-[29px] lg:text-[32px]"
          >
            {title}
          </h2>
          <p className="mt-4 text-[13.5px] leading-relaxed text-muted lg:text-[14px]">{description}</p>

          <div className="mt-9 grid gap-7 sm:grid-cols-3 sm:gap-6">
            {features.map((feature) => (
              <div key={feature.title}>
                <span className="flex h-11 w-11 items-center justify-center rounded-full border border-brand-500/30 bg-brand-500/10 text-brand-500">
                  <Icon name={feature.icon} className="h-5 w-5" />
                </span>
                <h3 className="mt-4 text-[15px] font-semibold text-ink">{feature.title}</h3>
                <p className="mt-2 text-[12.5px] leading-relaxed text-muted">{feature.description}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

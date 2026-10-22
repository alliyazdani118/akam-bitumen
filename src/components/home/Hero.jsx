import { hero } from '../../data/content.js';
import { photoUrl } from '../../lib/images.js';

/** Cinematic hero banner: offshore platform at sunset, text aligned left. */
export default function Hero() {
  return (
    <section aria-labelledby="hero-heading" className="relative isolate overflow-hidden bg-deep">
      <img
        src={photoUrl('hero', { w: 1920, q: 78 })}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 -z-20 h-full w-full object-cover"
        style={{ objectPosition: 'center 42%' }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-r from-[#06090B] via-[#06090B]/82 to-[#06090B]/30"
      />

      <div className="shell flex min-h-[250px] items-center py-12 sm:min-h-[285px] lg:min-h-[315px]">
        <div className="flex gap-4">
          <span aria-hidden="true" className="mt-1 h-16 w-[3px] shrink-0 bg-brand-500" />
          <div className="max-w-xl">
            {hero.eyebrow ? <p className="eyebrow mb-2.5">{hero.eyebrow}</p> : null}
            <h1
              id="hero-heading"
              className="text-[32px] font-bold leading-tight text-ink sm:text-[36px] lg:text-[40px]"
            >
              {hero.title}
            </h1>
            <p className="mt-3 text-[15px] leading-relaxed text-[#E0E0E0] lg:text-[16.5px]">
              {hero.description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

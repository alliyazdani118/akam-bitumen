import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { photo, photoSrcSet } from '../../lib/images.js';

/**
 * Dark editorial header used by every inner page, so the fixed transparent
 * header always sits over a dark surface and reads consistently.
 */
export default function PageHero({ eyebrow, title, copy, imageId, breadcrumb = [], children }) {
  return (
    <section className="relative isolate overflow-hidden bg-navy-950">
      {imageId ? (
        <img
          src={photo(imageId, 1920)}
          srcSet={photoSrcSet(imageId, [1280, 1600, 1920, 2400])}
          sizes="100vw"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 -z-10 h-full w-full object-cover"
          loading="eager"
          decoding="async"
          fetchpriority="high"
        />
      ) : null}

      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-b from-navy-950/90 via-navy-950/80 to-navy-950/95"
      />

      <div className="shell pb-16 pt-[124px] sm:pt-[140px] md:pb-20 md:pt-[168px]">
        {breadcrumb.length ? (
          <nav aria-label="Breadcrumb" className="mb-7">
            <ol className="flex items-center gap-2 font-display text-[11px] font-semibold uppercase tracking-[0.2em] text-white/50">
              <li>
                <Link to="/" className="transition-colors hover:text-champagne-300">
                  Home
                </Link>
              </li>
              {breadcrumb.map((crumb, index) => (
                <li key={crumb.label} className="flex items-center gap-2">
                  <ChevronRight aria-hidden="true" className="h-3.5 w-3.5 text-white/30" strokeWidth={2} />
                  {crumb.to && index < breadcrumb.length - 1 ? (
                    <Link to={crumb.to} className="transition-colors hover:text-champagne-300">
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className="text-champagne-300" aria-current="page">
                      {crumb.label}
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        ) : null}

        {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}

        <h1 className="mt-5 max-w-4xl font-display text-[clamp(2.1rem,5vw,3.6rem)] font-extrabold leading-[1.08] tracking-[-0.03em] text-white text-shadow-hero">
          {title}
        </h1>

        {copy ? (
          <p className="mt-5 max-w-2xl text-[16px] leading-[1.75] text-navy-200 sm:text-[17px]">
            {copy}
          </p>
        ) : null}

        {children}
      </div>
    </section>
  );
}

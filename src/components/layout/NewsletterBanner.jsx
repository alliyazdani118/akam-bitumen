import { newsletter } from '../../data/content.js';
import { photoUrl } from '../../lib/images.js';
import NewsletterForm from './NewsletterForm.jsx';

/** Compact newsletter banner shown immediately before the footer. */
export default function NewsletterBanner() {
  return (
    <section
      aria-labelledby="newsletter-heading"
      className="relative isolate overflow-hidden border-y border-line/70 bg-deep"
    >
      <img
        src={photoUrl('newsletter', { w: 1920, q: 70 })}
        alt=""
        aria-hidden="true"
        loading="lazy"
        className="absolute inset-0 -z-20 h-full w-full object-cover object-center"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-r from-[#050708] via-[#050708]/92 to-[#050708]/75"
      />

      <div className="shell flex flex-col gap-6 py-9 lg:flex-row lg:items-center lg:justify-between lg:gap-12 lg:py-10">
        <div className="max-w-lg">
          <h2 id="newsletter-heading" className="text-[22px] font-bold text-ink">
            {newsletter.title}
          </h2>
          <p className="mt-2 text-[13.5px] leading-relaxed text-muted">{newsletter.description}</p>
        </div>
        <div className="w-full min-w-0 lg:max-w-md">
          <NewsletterForm />
          <p className="mt-3 text-[11.5px] leading-relaxed text-faint">{newsletter.note}</p>
        </div>
      </div>
    </section>
  );
}

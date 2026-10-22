import { ArrowRight, KeyRound } from 'lucide-react';
import Button from '../ui/Button.jsx';
import Reveal from '../ui/Reveal.jsx';

/** Closing call to action on a soft blue-grey band. */
export default function CtaSection() {
  return (
    <section className="bg-mist" aria-labelledby="cta-title">
      <div className="shell py-16 md:py-20">
        <Reveal className="flex flex-col items-start gap-9 lg:flex-row lg:items-center lg:justify-between lg:gap-14">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
            <span
              aria-hidden="true"
              className="inline-flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-champagne-300 bg-white text-champagne-600"
            >
              <KeyRound className="h-7 w-7" strokeWidth={1.3} />
            </span>
            <div className="max-w-2xl">
              <h2
                id="cta-title"
                className="font-display text-[clamp(1.6rem,3.2vw,2.35rem)] font-extrabold leading-[1.16] tracking-[-0.025em] text-ink"
              >
                Ready to Find Your Perfect Property?
              </h2>
              <p className="mt-3.5 text-[16px] leading-relaxed text-navy-500">
                Let our experts guide you to the right home or investment.
              </p>
            </div>
          </div>

          <Button
            to="/contact"
            variant="navy"
            icon={ArrowRight}
            className="shrink-0 max-lg:w-full"
          >
            Get in Touch
          </Button>
        </Reveal>
      </div>
    </section>
  );
}

import Reveal from '../ui/Reveal.jsx';
import SectionLabel from '../ui/SectionLabel.jsx';
import TestimonialCarousel from '../testimonials/TestimonialCarousel.jsx';

/** Testimonials: introductory copy on the left, carousel on the right. */
export default function TestimonialsSection({ className = '' }) {
  return (
    <section
      aria-labelledby="testimonials-heading"
      className={`bg-base py-14 lg:py-[70px] ${className}`}
    >
      <div className="shell grid gap-10 lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1.7fr)] lg:gap-14">
        <Reveal>
          <SectionLabel>Testimonials</SectionLabel>
          <h2
            id="testimonials-heading"
            className="mt-4 text-[26px] font-bold leading-tight text-ink sm:text-[29px] lg:text-[32px]"
          >
            What Our Clients Say
          </h2>
          <p className="mt-4 text-[13.5px] leading-relaxed text-muted">
            Building lasting business relationships through dependable service, professional
            communication, and consistent quality.
          </p>
          <span aria-hidden="true" className="mt-6 block h-[3px] w-14 bg-brand-500" />
        </Reveal>

        {/*
          `min-w-0` lets this grid item shrink to the column width — without it
          the carousel's track pushes the whole grid past the viewport.
        */}
        <Reveal delay={80} className="min-w-0">
          <TestimonialCarousel />
        </Reveal>
      </div>
    </section>
  );
}

import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { testimonials } from '../../data/content.js';
import TestimonialCard from './TestimonialCard.jsx';

function perViewFor(width) {
  if (width >= 1024) return 3;
  if (width >= 640) return 2;
  return 1;
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

/**
 * Testimonial carousel.
 *
 * `active` is the testimonial in focus; `index` is the scroll offset needed to
 * keep it on screen. On desktop all three cards are visible, so the controls
 * move the highlight between them; on tablet and mobile the track also slides.
 * Touch devices can swipe.
 */
export default function TestimonialCarousel() {
  const [perView, setPerView] = useState(() =>
    typeof window === 'undefined' ? 3 : perViewFor(window.innerWidth),
  );
  const [index, setIndex] = useState(0);
  const [active, setActive] = useState(0);
  const touchStartX = useRef(null);

  useEffect(() => {
    const onResize = () => setPerView(perViewFor(window.innerWidth));
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const lastPosition = testimonials.length - 1;
  const maxIndex = Math.max(0, lastPosition - perView + 1);

  useEffect(() => {
    setIndex((current) => Math.min(current, maxIndex));
  }, [maxIndex]);

  /** Slides the track only as far as needed to bring `position` into view. */
  const reveal = (position) => {
    setIndex((current) => {
      if (position < current) return position;
      if (position > current + perView - 1) return clamp(position - perView + 1, 0, maxIndex);
      return Math.min(current, maxIndex);
    });
  };

  const select = (position) => {
    const next = clamp(position, 0, lastPosition);
    setActive(next);
    reveal(next);
  };

  const onTouchStart = (event) => {
    touchStartX.current = event.touches[0].clientX;
  };

  const onTouchEnd = (event) => {
    if (touchStartX.current === null) return;
    const delta = event.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(delta) < 40) return;
    select(active + (delta < 0 ? 1 : -1));
  };

  const arrowClass =
    'flex h-9 w-9 items-center justify-center border border-line text-muted transition-colors duration-200 ease-premium hover:border-brand-500 hover:text-brand-500 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-line disabled:hover:text-muted';

  return (
    <div
      role="group"
      aria-roledescription="carousel"
      aria-label="Customer testimonials"
      className="lg:pt-1"
    >
      <div className="w-full overflow-hidden" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
        <ul
          className="-mx-2.5 flex motion-safe:transition-transform motion-safe:duration-500 motion-safe:ease-premium"
          style={{ transform: `translateX(-${index * (100 / perView)}%)` }}
        >
          {testimonials.map((testimonial, position) => (
            <li key={testimonial.id} className="w-full shrink-0 px-2.5 sm:w-1/2 lg:w-1/3">
              <TestimonialCard testimonial={testimonial} active={position === active} />
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6 flex items-center justify-between gap-6">
        <ul className="flex items-center gap-2">
          {testimonials.map((testimonial, position) => (
            <li key={testimonial.id}>
              <button
                type="button"
                onClick={() => select(position)}
                aria-label={`Show testimonial ${position + 1}: ${testimonial.name}`}
                aria-current={position === active ? 'true' : undefined}
                className={`h-1.5 rounded-full transition-all duration-300 ease-premium ${
                  position === active ? 'w-6 bg-brand-500' : 'w-1.5 bg-line hover:bg-brand-500/60'
                }`}
              />
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => select(active - 1)}
            disabled={active === 0}
            aria-label="Previous testimonial"
            className={arrowClass}
          >
            <ChevronLeft className="h-4 w-4" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => select(active + 1)}
            disabled={active === lastPosition}
            aria-label="Next testimonial"
            className={arrowClass}
          >
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}

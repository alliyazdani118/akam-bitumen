import { Quote } from 'lucide-react';
import { photoSource } from '../../lib/images.js';

export default function TestimonialCard({ testimonial, active = false, className = '' }) {
  const portrait = photoSource(testimonial.portrait, { widths: [96, 160, 240], h: 240, q: 70 });

  return (
    <figure
      className={`flex h-full flex-col border p-5 transition-colors duration-300 ease-premium ${
        active ? 'border-brand-500/55 bg-[#1B2228]' : 'border-line/70 bg-card'
      } ${className}`}
    >
      <Quote className="h-5 w-5 shrink-0 text-brand-500" aria-hidden="true" />
      <blockquote className="mt-4 flex-1 text-[13px] leading-relaxed text-muted">
        “{testimonial.quote}”
      </blockquote>
      <figcaption className="mt-5 flex items-center gap-3 border-t border-hairline pt-4">
        <img
          {...portrait}
          alt=""
          loading="lazy"
          width="40"
          height="40"
          className="h-10 w-10 shrink-0 rounded-full object-cover"
        />
        <span>
          <span className="block text-[13px] font-semibold text-ink">{testimonial.name}</span>
          <span className="mt-0.5 block text-[11.5px] text-brand-500">{testimonial.role}</span>
        </span>
      </figcaption>
    </figure>
  );
}

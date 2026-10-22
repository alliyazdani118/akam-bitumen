import { Quote } from 'lucide-react';
import { testimonials } from '../../data/site.js';
import { portrait } from '../../lib/images.js';
import Reveal from '../ui/Reveal.jsx';
import SectionHeading from '../ui/SectionHeading.jsx';

export default function TestimonialsSection() {
  return (
    <section className="section bg-white" aria-labelledby="testimonials-title">
      <div className="shell">
        <Reveal>
          <SectionHeading
            align="center"
            eyebrow="Testimonials"
            title="What our clients say"
            copy="Sellers, buyers and investors on what it is like to work with Horizon."
          />
        </Reveal>

        <ul className="mt-12 grid gap-6 lg:mt-14 lg:grid-cols-3">
          {testimonials.map((item, index) => (
            <li key={item.id}>
              <Reveal delay={index * 90} className="h-full">
                <figure className="flex h-full flex-col rounded-card border border-line bg-paper p-7 transition-all duration-500 ease-premium hover:-translate-y-1 hover:bg-white hover:shadow-card">
                  <Quote
                    aria-hidden="true"
                    className="h-7 w-7 text-champagne-400"
                    strokeWidth={1.4}
                  />
                  <blockquote className="mt-6 flex-1 text-[15px] leading-[1.75] text-navy-600">
                    &ldquo;{item.quote}&rdquo;
                  </blockquote>
                  <figcaption className="mt-7 flex items-center gap-4 border-t border-line pt-6">
                    <img
                      src={portrait(item.photo, 96, 96)}
                      alt=""
                      width={48}
                      height={48}
                      loading="lazy"
                      decoding="async"
                      className="h-12 w-12 shrink-0 rounded-full object-cover"
                    />
                    <span>
                      <span className="block font-display text-[15px] font-bold text-ink">
                        {item.name}
                      </span>
                      <span className="mt-0.5 block text-[12.5px] text-navy-400">{item.role}</span>
                    </span>
                  </figcaption>
                </figure>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

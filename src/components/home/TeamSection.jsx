import { ArrowRight, Mail, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import { team } from '../../data/site.js';
import { portrait } from '../../lib/images.js';
import Button from '../ui/Button.jsx';
import Reveal from '../ui/Reveal.jsx';
import SectionHeading from '../ui/SectionHeading.jsx';

const telHref = (phone) => `tel:${phone.replace(/[^\d+]/g, '')}`;

/** Team preview for the homepage — four advisors with contact actions. */
export default function TeamSection() {
  return (
    <section className="section bg-paper" aria-labelledby="team-title">
      <div className="shell">
        <Reveal className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Our Team"
            title="The people behind the portfolio"
            copy="Four advisors, each with a specialism — and a direct line you can actually use."
          />
          <Button
            to="/team"
            variant="outlineDark"
            icon={ArrowRight}
            className="shrink-0 self-start lg:self-auto"
          >
            Meet the team
          </Button>
        </Reveal>

        <ul className="mt-12 grid gap-8 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4 lg:gap-6">
          {team.map((member, index) => (
            <li key={member.id}>
              <Reveal delay={index * 80}>
                <article className="group">
                  <div className="media zoomable aspect-[4/5]">
                    <img
                      src={portrait(member.photo, 800, 1000)}
                      alt={`Portrait of ${member.name}, ${member.role} at Horizon Properties`}
                      width={800}
                      height={1000}
                      loading="lazy"
                      decoding="async"
                    />

                    <div className="absolute inset-0 flex items-end justify-center gap-2.5 bg-gradient-to-t from-navy-950/80 via-navy-950/5 to-transparent p-5 transition-opacity duration-500 ease-premium lg:opacity-0 lg:group-hover:opacity-100 lg:group-focus-within:opacity-100">
                      <a
                        href={`mailto:${member.email}`}
                        aria-label={`Email ${member.name}`}
                        className="icon-btn h-10 w-10 border-white/30 text-white hover:border-white hover:bg-white hover:text-ink"
                      >
                        <Mail aria-hidden="true" className="h-4 w-4" strokeWidth={1.8} />
                      </a>
                      <a
                        href={telHref(member.phone)}
                        aria-label={`Call ${member.name}`}
                        className="icon-btn h-10 w-10 border-white/30 text-white hover:border-white hover:bg-white hover:text-ink"
                      >
                        <Phone aria-hidden="true" className="h-4 w-4" strokeWidth={1.8} />
                      </a>
                      <Link
                        to={`/contact?advisor=${member.id}`}
                        aria-label={`Contact ${member.name}`}
                        className="icon-btn h-10 w-10 border-white/30 text-white hover:border-white hover:bg-white hover:text-ink"
                      >
                        <ArrowRight aria-hidden="true" className="h-4 w-4" strokeWidth={1.8} />
                      </Link>
                    </div>
                  </div>

                  <h3 className="mt-5 font-display text-[17px] font-bold tracking-[-0.01em] text-ink">
                    {member.name}
                  </h3>
                  <p className="mt-1.5 font-display text-[10.5px] font-semibold uppercase tracking-[0.2em] text-champagne-600">
                    {member.role}
                  </p>
                  <p className="mt-3 text-[13.5px] leading-relaxed text-navy-500">{member.focus}</p>
                </article>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

import { Mail, Phone } from 'lucide-react';
import PageHero from '../components/layout/PageHero.jsx';
import CtaSection from '../components/home/CtaSection.jsx';
import Button from '../components/ui/Button.jsx';
import Reveal from '../components/ui/Reveal.jsx';
import { team } from '../data/site.js';
import { portrait } from '../lib/images.js';

const telHref = (phone) => `tel:${phone.replace(/[^\d+]/g, '')}`;

export default function Team() {
  return (
    <>
      <PageHero
        eyebrow="Our Team"
        title="Four advisors. One standard."
        copy="Everyone at Horizon works on the same file from first viewing to completion. You will always know who to call, and they will always know the property."
        imageId="photo-1600210492486-724fe5c67fb0"
        breadcrumb={[{ label: 'Team' }]}
      />

      <section className="section bg-paper" aria-labelledby="team-list-title">
        <div className="shell">
          <h2 id="team-list-title" className="sr-only">
            Horizon Properties advisors
          </h2>

          <ul className="grid gap-12 sm:grid-cols-2 lg:gap-8">
            {team.map((member, index) => (
              <li key={member.id}>
                <Reveal delay={index * 80}>
                  <article className="group flex h-full flex-col">
                    <div className="media zoomable aspect-[4/5]">
                      <img
                        src={portrait(member.photo, 900, 1125)}
                        alt={`Portrait of ${member.name}, ${member.role} at Horizon Properties`}
                        width={900}
                        height={1125}
                        loading="lazy"
                        decoding="async"
                      />
                    </div>

                    <div className="mt-6">
                      <h3 className="font-display text-[22px] font-bold tracking-[-0.02em] text-ink">
                        {member.name}
                      </h3>
                      <p className="mt-2 font-display text-[10.5px] font-semibold uppercase tracking-[0.2em] text-champagne-600">
                        {member.role}
                      </p>
                      <p className="mt-4 text-[14.5px] leading-relaxed text-navy-500">
                        {member.bio}
                      </p>
                      <p className="mt-4 text-[13px] leading-relaxed text-navy-400">{member.focus}</p>

                      <div className="mt-6 flex flex-wrap items-center gap-3">
                        <Button
                          variant="outlineDark"
                          size="sm"
                          to={`/contact?advisor=${member.id}`}
                        >
                          Contact {member.name.split(' ')[0]}
                        </Button>
                        <a
                          href={`mailto:${member.email}`}
                          aria-label={`Email ${member.name}`}
                          className="icon-btn h-11 w-11 border-line text-navy-500 hover:border-navy-900 hover:bg-navy-900 hover:text-white"
                        >
                          <Mail aria-hidden="true" className="h-4 w-4" strokeWidth={1.8} />
                        </a>
                        <a
                          href={telHref(member.phone)}
                          aria-label={`Call ${member.name}`}
                          className="icon-btn h-11 w-11 border-line text-navy-500 hover:border-navy-900 hover:bg-navy-900 hover:text-white"
                        >
                          <Phone aria-hidden="true" className="h-4 w-4" strokeWidth={1.8} />
                        </a>
                      </div>
                    </div>
                  </article>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaSection />
    </>
  );
}

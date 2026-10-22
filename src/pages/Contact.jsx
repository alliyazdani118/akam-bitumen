import { Clock, Mail, MapPin, Phone } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import InquiryForm from '../components/contact/InquiryForm.jsx';
import PageHero from '../components/layout/PageHero.jsx';
import Reveal from '../components/ui/Reveal.jsx';
import { contactSubjects, site, team } from '../data/site.js';
import { portrait } from '../lib/images.js';

export default function Contact() {
  const [params] = useSearchParams();
  const advisorId = params.get('advisor');
  const advisor = advisorId ? team.find((member) => member.id === advisorId) ?? null : null;
  const subjectParam = params.get('subject');
  const defaultSubject = contactSubjects.includes(subjectParam)
    ? subjectParam
    : 'General enquiry';

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let's talk about what you're looking for"
        copy="Tell us what you need — a viewing, a valuation, or simply a conversation about the market. One of our advisors will reply within one business day."
        imageId="photo-1524230572899-a752b3835840"
        breadcrumb={[{ label: 'Contact' }]}
      />

      <section className="section bg-paper" aria-labelledby="contact-form-title">
        <div className="shell grid gap-12 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-5">
            <Reveal>
              <p className="eyebrow">Get in Touch</p>
              <h2 id="contact-form-title" className="section-title mt-5">
                Speak to an advisor
              </h2>
              <p className="body-lg mt-5">
                Prefer to call? The phone in our office is answered by an advisor, not a
                switchboard.
              </p>
            </Reveal>

            {advisor ? (
              <Reveal delay={80} className="mt-9">
                <div className="flex items-center gap-4 rounded-card border border-champagne-200 bg-champagne-50 p-5">
                  <img
                    src={portrait(advisor.photo, 160, 160)}
                    alt={`Portrait of ${advisor.name}`}
                    width={56}
                    height={56}
                    loading="lazy"
                    decoding="async"
                    className="h-14 w-14 shrink-0 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-display text-[15px] font-bold text-ink">
                      You are contacting {advisor.name}
                    </p>
                    <p className="mt-1 text-[13px] text-navy-500">
                      {advisor.role} · {advisor.focus}
                    </p>
                  </div>
                </div>
              </Reveal>
            ) : null}

            <Reveal delay={100} className="mt-9">
              <dl className="divide-y divide-line border-y border-line">
                <div className="flex items-start gap-4 py-5">
                  <dt className="sr-only">Phone</dt>
                  <dd className="flex items-start gap-4">
                    <Phone aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-champagne-500" strokeWidth={1.8} />
                    <a
                      href={site.phoneHref}
                      className="font-display text-[15px] font-semibold text-ink transition-colors hover:text-champagne-600"
                    >
                      {site.phone}
                    </a>
                  </dd>
                </div>
                <div className="flex items-start gap-4 py-5">
                  <dt className="sr-only">Email</dt>
                  <dd className="flex items-start gap-4">
                    <Mail aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-champagne-500" strokeWidth={1.8} />
                    <a
                      href={site.emailHref}
                      className="break-all text-[15px] text-navy-600 transition-colors hover:text-ink"
                    >
                      {site.email}
                    </a>
                  </dd>
                </div>
                <div className="flex items-start gap-4 py-5">
                  <dt className="sr-only">Office</dt>
                  <dd className="flex items-start gap-4">
                    <MapPin aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-champagne-500" strokeWidth={1.8} />
                    <span className="text-[15px] leading-relaxed text-navy-600">
                      {site.address.line1}
                      <br />
                      {site.address.line2}
                    </span>
                  </dd>
                </div>
                <div className="flex items-start gap-4 py-5">
                  <dt className="sr-only">Opening hours</dt>
                  <dd className="flex items-start gap-4">
                    <Clock aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-champagne-500" strokeWidth={1.8} />
                    <span className="text-[15px] text-navy-600">{site.hours}</span>
                  </dd>
                </div>
              </dl>
            </Reveal>

            <Reveal delay={140} className="mt-9">
              <ul className="flex flex-wrap gap-x-6 gap-y-3 text-[13.5px] text-navy-500">
                {team.map((member) => (
                  <li key={member.id}>
                    <a
                      href={`mailto:${member.email}`}
                      className="link-underline transition-colors hover:text-ink"
                    >
                      {member.name}
                    </a>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <Reveal delay={120}>
              <div className="rounded-card border border-line bg-white p-6 shadow-card sm:p-8">
                <h2 className="font-display text-[20px] font-bold tracking-[-0.01em] text-ink">
                  Send us a message
                </h2>
                <p className="mt-2.5 text-[14px] leading-relaxed text-navy-500">
                  Fields marked with an asterisk are required.
                </p>
                <div className="mt-8">
                  <InquiryForm
                    defaultSubject={defaultSubject}
                    messagePlaceholder={
                      advisor
                        ? `I'd like to speak with ${advisor.name} about…`
                        : undefined
                    }
                  />
                </div>
              </div>
            </Reveal>

            <Reveal delay={160} className="mt-6">
              <p className="text-[13px] leading-relaxed text-navy-400">
                Prefer to speak to the advisor handling a specific property?{' '}
                <a
                  href={site.phoneHref}
                  className="link-underline font-medium text-navy-600 transition-colors hover:text-ink"
                >
                  Call {site.phone}
                </a>{' '}
                and we will put you straight through.
              </p>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}

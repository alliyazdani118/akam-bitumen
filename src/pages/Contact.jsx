import { Link } from 'react-router-dom';
import { Mail, MapPin, Phone } from 'lucide-react';
import PageHero from '../components/layout/PageHero.jsx';
import InquiryForm from '../components/contact/InquiryForm.jsx';
import SocialLinks from '../components/layout/SocialLinks.jsx';
import Reveal from '../components/ui/Reveal.jsx';
import SectionLabel from '../components/ui/SectionLabel.jsx';
import { site } from '../data/site.js';
import useDocumentTitle from '../hooks/useDocumentTitle.js';

export default function Contact() {
  useDocumentTitle(
    'Contact',
    `Contact AKAM BITUMEN CO. by phone on ${site.phone.label}, by email at ${site.email.label}, or send a quote request through the enquiry form.`,
  );

  const details = [
    {
      icon: Phone,
      label: 'Phone',
      value: site.phone.label,
      href: site.phone.href,
      note: 'Weekdays, during office hours.',
    },
    {
      icon: Mail,
      label: 'Email',
      value: site.email.label,
      href: site.email.href,
      note: 'Answered within one working day.',
    },
    {
      icon: MapPin,
      label: 'Address',
      value: site.address,
      note: 'Postal and collection details confirmed per order.',
    },
  ];

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Talk to our supply team"
        description="Send your requirement and we will confirm what can be supplied, at what specification and when."
        image="newsletter"
      />

      <section className="bg-base py-12 lg:py-[60px]">
        <div className="shell grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)] lg:gap-14">
          <Reveal>
            <SectionLabel withLine>Contact details</SectionLabel>
            <h2 className="mt-4 text-[26px] font-bold leading-tight text-ink sm:text-[29px]">
              How to reach us
            </h2>

            <ul className="mt-8 space-y-4">
              {details.map((detail) => {
                const IconComponent = detail.icon;
                return (
                  <li key={detail.label} className="border border-line/70 bg-card p-5">
                    <span className="flex items-center gap-3">
                      <IconComponent className="h-4 w-4 shrink-0 text-brand-500" strokeWidth={1.8} aria-hidden="true" />
                      <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-faint">
                        {detail.label}
                      </span>
                    </span>
                    <p className="mt-3 text-[14px] text-ink">
                      {detail.href ? (
                        <a href={detail.href} className="transition-colors duration-200 ease-premium hover:text-brand-500">
                          {detail.value}
                        </a>
                      ) : (
                        detail.value
                      )}
                    </p>
                    <p className="mt-1.5 text-[12px] text-faint">{detail.note}</p>
                  </li>
                );
              })}
            </ul>

            <div className="mt-6 border border-line/70 bg-surface p-5">
              <h3 className="text-[13px] font-semibold uppercase tracking-[0.14em] text-ink">Follow us</h3>
              <SocialLinks className="mt-4" linkClassName="border border-line p-2" />
              <p className="mt-4 text-[12px] leading-relaxed text-faint">
                For product, shipping and ordering questions, the{' '}
                <Link to="/faq" className="text-brand-500 underline-offset-4 hover:underline">
                  FAQ page
                </Link>{' '}
                answers the most common ones.
              </p>
            </div>
          </Reveal>

          <Reveal delay={80}>
            <div id="request-a-quote" className="scroll-mt-36">
              <SectionLabel withLine>Request a quote</SectionLabel>
              <h2 className="mt-4 text-[26px] font-bold leading-tight text-ink sm:text-[29px]">
                Send us your requirement
              </h2>
              <p className="mt-4 text-[13.5px] leading-relaxed text-muted">
                Grade or specification, volume, delivery point and timing are what we need to answer
                properly. Anything you do not have yet can follow later.
              </p>
              <div className="mt-7">
                <InquiryForm />
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

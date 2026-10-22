import PageHero from '../components/layout/PageHero.jsx';
import CtaBanner from '../components/layout/CtaBanner.jsx';
import TestimonialCard from '../components/testimonials/TestimonialCard.jsx';
import NewsletterBanner from '../components/layout/NewsletterBanner.jsx';
import Reveal from '../components/ui/Reveal.jsx';
import SectionLabel from '../components/ui/SectionLabel.jsx';
import { testimonials } from '../data/content.js';
import useDocumentTitle from '../hooks/useDocumentTitle.js';

export default function Testimonials() {
  useDocumentTitle(
    'Testimonials',
    'What customers say about working with AKAM BITUMEN CO. on bitumen and petroleum supply.',
  );

  return (
    <>
      <PageHero
        eyebrow="Testimonials"
        title="What Our Clients Say"
        description="Building lasting business relationships through dependable service, professional communication, and consistent quality."
      />

      <section className="bg-base py-12 lg:py-[60px]">
        <div className="shell">
          <SectionLabel withLine>Client feedback</SectionLabel>
          <h2 className="mt-4 max-w-2xl text-[26px] font-bold leading-tight text-ink sm:text-[29px] lg:text-[32px]">
            Feedback from the people who buy from us
          </h2>

          <div className="mt-9 grid gap-5 lg:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <Reveal key={testimonial.id} delay={index * 60} className="h-full">
                <TestimonialCard testimonial={testimonial} active={index === 0} />
              </Reveal>
            ))}
          </div>

          <p className="mt-8 max-w-3xl border-l-2 border-brand-500/60 pl-4 text-[12.5px] leading-relaxed text-faint">
            The quotes above are sample content used while this website is being prepared. They are
            not verified customer statements and will be replaced with approved feedback.
          </p>
        </div>
      </section>

      <NewsletterBanner />
      <CtaBanner />
    </>
  );
}

import PageHero from '../components/layout/PageHero.jsx';
import CtaBanner from '../components/layout/CtaBanner.jsx';
import FaqAccordion from '../components/faq/FaqAccordion.jsx';
import SectionLabel from '../components/ui/SectionLabel.jsx';
import { faqItems } from '../data/infoPages.js';
import useDocumentTitle from '../hooks/useDocumentTitle.js';

export default function Faq() {
  useDocumentTitle(
    'Frequently Asked Questions',
    'Product information, shipping and ordering questions answered by AKAM BITUMEN CO.',
  );

  return (
    <>
      <PageHero
        eyebrow="Support"
        title="Frequently Asked Questions"
        description="Product information, shipping arrangements and how an enquiry is handled."
      />

      <section className="bg-base py-12 lg:py-[60px]">
        <div className="shell grid gap-10 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.6fr)] lg:gap-14">
          <div>
            <SectionLabel withLine>Answers</SectionLabel>
            <h2 className="mt-4 text-[24px] font-bold leading-tight text-ink sm:text-[27px]">
              Questions we are asked most
            </h2>
            <p className="mt-4 text-[13.5px] leading-relaxed text-muted">
              If your question is not covered here, the fastest route is a short enquiry with the
              specification and volume you are working to.
            </p>
          </div>

          <FaqAccordion items={faqItems} />
        </div>
      </section>

      <CtaBanner />
    </>
  );
}

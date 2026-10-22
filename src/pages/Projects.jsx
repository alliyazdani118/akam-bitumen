import PageHero from '../components/layout/PageHero.jsx';
import CtaBanner from '../components/layout/CtaBanner.jsx';
import Reveal from '../components/ui/Reveal.jsx';
import Icon from '../components/ui/Icon.jsx';
import SectionLabel from '../components/ui/SectionLabel.jsx';
import { programmes } from '../data/content.js';
import useDocumentTitle from '../hooks/useDocumentTitle.js';

export default function Projects() {
  useDocumentTitle(
    'Projects & Supply Programmes',
    'The supply programmes AKAM BITUMEN CO. takes on: road and highway supply, distributor replenishment, export consignments and industrial support.',
  );

  return (
    <>
      <PageHero
        eyebrow="Projects"
        title="Supply programmes"
        description="The work we take on, described by the supply structure rather than by named contracts."
        image="refinery"
      />

      <section className="bg-base py-12 lg:py-[60px]">
        <div className="shell">
          <SectionLabel withLine>Capability areas</SectionLabel>
          <h2 className="mt-4 max-w-2xl text-[26px] font-bold leading-tight text-ink sm:text-[29px] lg:text-[32px]">
            Supply structures we run today
          </h2>
          <p className="mt-4 max-w-3xl text-[13.5px] leading-relaxed text-muted">
            Programmes are defined by volume, delivery points and review intervals. Which of these
            fits your requirement depends on the specification, the destination and the frequency of
            demand.
          </p>

          <div className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {programmes.map((programme, index) => (
              <Reveal key={programme.title} delay={index * 50} className="h-full">
                <article className="group h-full border border-line/70 bg-card p-5 transition-colors duration-300 ease-premium hover:border-brand-500/60">
                  <span className="flex h-11 w-11 items-center justify-center border border-brand-500/30 bg-brand-500/10 text-brand-500">
                    <Icon name={programme.icon} className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 text-[16px] font-semibold text-ink">{programme.title}</h3>
                  <p className="mt-2 text-[13px] leading-relaxed text-muted">{programme.description}</p>
                </article>
              </Reveal>
            ))}
          </div>

          <p className="mt-8 max-w-3xl border-l-2 border-brand-500/60 pl-4 text-[12.5px] leading-relaxed text-faint">
            Named project references are shared on request once the customer has approved their use.
            This page describes the supply work we take on, not completed customer contracts.
          </p>
        </div>
      </section>

      <CtaBanner
        title="Planning a programme?"
        description="Tell us the volume, the delivery points and the timing, and we will confirm how the supply can be structured."
      />
    </>
  );
}

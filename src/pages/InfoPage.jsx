import { Link } from 'react-router-dom';
import { ArrowLeft, Info } from 'lucide-react';
import PageHero from '../components/layout/PageHero.jsx';
import CtaBanner from '../components/layout/CtaBanner.jsx';
import { getInfoPage } from '../data/infoPages.js';
import useDocumentTitle from '../hooks/useDocumentTitle.js';
import NotFound from './NotFound.jsx';

/** Renders the small legal pages from `src/data/infoPages.js`. */
export default function InfoPage({ slug }) {
  const page = getInfoPage(slug);
  useDocumentTitle(page?.title, page?.intro);

  if (!page) return <NotFound />;

  return (
    <>
      <PageHero eyebrow={page.eyebrow} title={page.title} description={page.intro} />

      <section className="bg-base py-12 lg:py-[60px]">
        <div className="mx-auto w-full max-w-3xl px-5 sm:px-6 lg:px-8">
          {page.notice ? (
            <p className="flex items-start gap-3 border border-brand-500/30 bg-brand-500/10 p-4 text-[12.5px] leading-relaxed text-brand-100">
              <Info className="mt-0.5 h-4 w-4 shrink-0 text-brand-500" aria-hidden="true" />
              {page.notice}
            </p>
          ) : null}

          {page.sections.map((section) => (
            <section key={section.heading} className="mt-10">
              <h2 className="text-[19px] font-bold text-ink">{section.heading}</h2>
              {section.body.map((paragraph) => (
                <p key={paragraph.slice(0, 24)} className="mt-3 text-[13.5px] leading-relaxed text-muted">
                  {paragraph}
                </p>
              ))}
            </section>
          ))}

          <p className="mt-10 border-t border-hairline pt-6 text-[12.5px] text-faint">
            Last reviewed when this site was prepared.
          </p>

          <Link
            to="/"
            className="mt-6 inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.14em] text-faint transition-colors duration-200 ease-premium hover:text-brand-500"
          >
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
            Back to home
          </Link>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}

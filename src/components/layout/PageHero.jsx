import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { photoUrl } from '../../lib/images.js';

/**
 * Banner used at the top of every inner page: optional photograph, dark
 * overlay, orange accent line and the page's single H1.
 */
export default function PageHero({ eyebrow, title, description, image, imagePosition = 'center' }) {
  return (
    <section className="relative isolate overflow-hidden border-b border-hairline bg-deep">
      {image ? (
        <>
          <img
            src={photoUrl(image, { w: 1920, q: 74 })}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 -z-20 h-full w-full object-cover"
            style={{ objectPosition: imagePosition }}
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 bg-gradient-to-r from-[#080B0D] via-[#080B0D]/92 to-[#080B0D]/70"
          />
        </>
      ) : null}

      <div className="shell flex min-h-[210px] flex-col justify-center py-12 lg:min-h-[250px]">
        <nav aria-label="Breadcrumb" className="mb-4">
          <ol className="flex items-center gap-2 text-[11.5px] text-faint">
            <li>
              <Link to="/" className="transition-colors duration-200 ease-premium hover:text-brand-500">
                Home
              </Link>
            </li>
            <li aria-hidden="true">
              <ChevronRight className="h-3 w-3" />
            </li>
            <li className="text-brand-500" aria-current="page">
              {title}
            </li>
          </ol>
        </nav>

        <div className="flex gap-4">
          <span aria-hidden="true" className="mt-1 h-14 w-[3px] shrink-0 bg-brand-500" />
          <div>
            {eyebrow ? <p className="eyebrow mb-2">{eyebrow}</p> : null}
            <h1 className="text-[27px] font-bold leading-tight text-ink sm:text-[34px]">{title}</h1>
            {description ? (
              <p className="mt-3 max-w-2xl text-[14.5px] leading-relaxed text-[#E0E0E0]">
                {description}
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}

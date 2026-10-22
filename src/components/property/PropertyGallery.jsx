import { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, Expand, X } from 'lucide-react';
import { photo, photoSrcSet } from '../../lib/images.js';
import useBodyScrollLock from '../../hooks/useBodyScrollLock.js';
import { IconButton } from '../ui/Button.jsx';

/**
 * Full-bleed gallery for the property detail page: a large hero image with an
 * overlaid thumbnail rail, and a full-screen viewer with keyboard support.
 */
export default function PropertyGallery({ images, title, children }) {
  const [active, setActive] = useState(0);
  const [viewerOpen, setViewerOpen] = useState(false);
  const closeRef = useRef(null);
  const triggerRef = useRef(null);
  const railRef = useRef(null);

  const total = images.length;
  const current = images[active];

  const go = useCallback(
    (delta) => setActive((index) => (index + delta + total) % total),
    [total],
  );

  useBodyScrollLock(viewerOpen);

  useEffect(() => {
    if (!viewerOpen) return undefined;

    const onKeyDown = (event) => {
      if (event.key === 'Escape') setViewerOpen(false);
      if (event.key === 'ArrowRight') go(1);
      if (event.key === 'ArrowLeft') go(-1);
    };

    window.addEventListener('keydown', onKeyDown);
    closeRef.current?.focus();

    return () => {
      window.removeEventListener('keydown', onKeyDown);
      triggerRef.current?.focus();
    };
  }, [viewerOpen, go]);

  // Keep the active thumbnail in view when navigating with the keyboard.
  useEffect(() => {
    const rail = railRef.current;
    const node = rail?.children?.[active];
    if (!rail || !node) return;
    const target = node.offsetLeft - rail.clientWidth / 2 + node.clientWidth / 2;
    rail.scrollTo({ left: Math.max(target, 0), behavior: 'smooth' });
  }, [active]);

  return (
    <>
      <section className="relative isolate bg-navy-950" aria-label={`${title} photo gallery`}>
        <img
          key={current.id}
          src={photo(current.id, 2000)}
          srcSet={photoSrcSet(current.id, [1280, 1600, 2000, 2400])}
          sizes="100vw"
          alt={current.alt}
          className="h-[58vh] min-h-[430px] w-full animate-fade-in object-cover sm:h-[64vh] lg:h-[78vh]"
          loading="eager"
          decoding="async"
          fetchpriority="high"
        />

        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-56 bg-gradient-to-b from-navy-950/90 via-navy-950/45 to-transparent"
        />
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-navy-950/95 via-navy-950/55 to-transparent"
        />

        <div className="absolute inset-x-0 top-0">{children}</div>

        <div className="absolute inset-x-0 bottom-0">
          <div className="shell pb-6 sm:pb-7">
            <div className="flex items-end justify-between gap-5">
              <ul
                ref={railRef}
                className="no-scrollbar flex gap-2.5 overflow-x-auto pb-1"
                aria-label="Choose a photo"
              >
                {images.map((image, index) => (
                  <li key={image.id} className="flex-none">
                    <button
                      type="button"
                      onClick={() => setActive(index)}
                      aria-label={`Show photo ${index + 1} of ${total}`}
                      aria-current={index === active}
                      className={[
                        'block h-12 w-16 overflow-hidden rounded-[3px] border transition-all duration-300 ease-premium sm:h-14 sm:w-[76px]',
                        index === active
                          ? 'border-champagne-400 opacity-100'
                          : 'border-white/25 opacity-60 hover:opacity-100',
                      ].join(' ')}
                    >
                      <img
                        src={photo(image.id, 240)}
                        alt=""
                        width={240}
                        height={160}
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-cover"
                      />
                    </button>
                  </li>
                ))}
              </ul>

              <div className="flex shrink-0 items-center gap-3">
                <span className="rounded-[2px] bg-navy-950/70 px-3 py-2 font-display text-[11px] font-semibold tabular-nums text-white backdrop-blur-sm">
                  {active + 1} / {total}
                </span>
                <button
                  ref={triggerRef}
                  type="button"
                  onClick={() => setViewerOpen(true)}
                  className="inline-flex items-center gap-2 rounded-control bg-white/95 px-4 py-2.5 font-display text-[11px] font-semibold uppercase tracking-[0.16em] text-ink transition-all duration-300 ease-premium hover:bg-white hover:shadow-lift"
                >
                  <Expand aria-hidden="true" className="h-3.5 w-3.5" strokeWidth={2} />
                  <span className="hidden sm:inline">View all photos</span>
                  <span className="sm:hidden">Photos</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {viewerOpen ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${title} — full screen gallery`}
          className="fixed inset-0 z-[70] flex flex-col bg-navy-950/95 backdrop-blur-sm"
        >
          <div className="flex items-center justify-between gap-4 px-5 py-4 sm:px-8">
            <p className="truncate font-display text-[12px] font-semibold uppercase tracking-[0.2em] text-white/70">
              {title}
            </p>
            <div className="flex items-center gap-3">
              <span className="font-display text-[12px] font-semibold tabular-nums text-white/70">
                {active + 1} / {total}
              </span>
              <button
                ref={closeRef}
                type="button"
                onClick={() => setViewerOpen(false)}
                aria-label="Close gallery"
                className="icon-btn border-white/25 text-white hover:border-white hover:bg-white hover:text-ink"
              >
                <X aria-hidden="true" className="h-[18px] w-[18px]" strokeWidth={1.8} />
              </button>
            </div>
          </div>

          <div className="flex min-h-0 flex-1 items-center gap-3 px-3 sm:gap-6 sm:px-8">
            <IconButton
              label="Previous photo"
              icon={ArrowLeft}
              variant="light"
              onClick={() => go(-1)}
              className="shrink-0"
            />
            <figure className="flex min-h-0 flex-1 items-center justify-center">
              <img
                key={current.id}
                src={photo(current.id, 2000)}
                alt={current.alt}
                className="max-h-full w-auto max-w-full animate-fade-in rounded-[4px] object-contain"
              />
              <figcaption className="sr-only">{current.alt}</figcaption>
            </figure>
            <IconButton
              label="Next photo"
              icon={ArrowRight}
              variant="light"
              onClick={() => go(1)}
              className="shrink-0"
            />
          </div>

          <p className="px-5 pb-7 pt-5 text-center text-[13px] text-navy-200 sm:px-8">
            {current.alt}
          </p>
        </div>
      ) : null}
    </>
  );
}

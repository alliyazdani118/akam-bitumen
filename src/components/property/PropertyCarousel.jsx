import { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import PropertyCard from './PropertyCard.jsx';
import { IconButton } from '../ui/Button.jsx';

const GAP = 20;
const DRAG_THRESHOLD = 5;

/**
 * Horizontal property rail.
 *
 * Native scroll-snap does the heavy lifting, so touch swipe and trackpad come
 * for free; mouse drag, arrow buttons, a progress bar and keyboard access are
 * layered on top. The first slide is wider than the rest, which gives the
 * "one hero card plus neighbours" rhythm of the reference.
 */
export default function PropertyCarousel({ properties, ariaLabel = 'Featured properties' }) {
  const scrollerRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [edges, setEdges] = useState({ atStart: true, atEnd: false });

  const syncScrollState = useCallback(() => {
    const node = scrollerRef.current;
    if (!node) return;
    const max = node.scrollWidth - node.clientWidth;
    setProgress(max > 0 ? node.scrollLeft / max : 0);
    setEdges({
      atStart: node.scrollLeft <= 4,
      atEnd: node.scrollLeft >= max - 4,
    });
  }, []);

  useEffect(() => {
    const node = scrollerRef.current;
    if (!node) return undefined;
    syncScrollState();
    node.addEventListener('scroll', syncScrollState, { passive: true });
    window.addEventListener('resize', syncScrollState);
    return () => {
      node.removeEventListener('scroll', syncScrollState);
      window.removeEventListener('resize', syncScrollState);
    };
  }, [syncScrollState, properties]);

  /**
   * Mouse drag to scroll. Native listeners (rather than React props) keep the
   * pointer stream off React's render path, and pointer capture keeps the drag
   * alive when the cursor leaves the rail.
   */
  useEffect(() => {
    const node = scrollerRef.current;
    if (!node) return undefined;

    let active = false;
    let moved = false;
    let startX = 0;
    let startScroll = 0;

    const onPointerDown = (event) => {
      if (event.pointerType === 'touch' || event.button !== 0) return;
      active = true;
      moved = false;
      startX = event.clientX;
      startScroll = node.scrollLeft;
      node.classList.add('cursor-grabbing');
      try {
        node.setPointerCapture(event.pointerId);
      } catch {
        /* synthetic or unsupported pointer id — dragging still works */
      }
    };

    const onPointerMove = (event) => {
      if (!active) return;
      const delta = event.clientX - startX;
      if (!moved && Math.abs(delta) > DRAG_THRESHOLD) moved = true;
      if (!moved) return;
      event.preventDefault();
      node.scrollLeft = startScroll - delta;
    };

    const endDrag = () => {
      if (!active) return;
      active = false;
      node.classList.remove('cursor-grabbing');
    };

    // Swallow the click that follows a drag so it cannot open a card.
    const onClickCapture = (event) => {
      if (!moved) return;
      moved = false;
      event.preventDefault();
      event.stopPropagation();
    };

    node.addEventListener('pointerdown', onPointerDown);
    node.addEventListener('pointermove', onPointerMove);
    node.addEventListener('pointerup', endDrag);
    node.addEventListener('pointercancel', endDrag);
    node.addEventListener('click', onClickCapture, true);

    return () => {
      node.removeEventListener('pointerdown', onPointerDown);
      node.removeEventListener('pointermove', onPointerMove);
      node.removeEventListener('pointerup', endDrag);
      node.removeEventListener('pointercancel', endDrag);
      node.removeEventListener('click', onClickCapture, true);
    };
  }, []);

  const step = useCallback(() => {
    const node = scrollerRef.current;
    const firstChild = node?.firstElementChild;
    return (firstChild?.getBoundingClientRect().width ?? 360) + GAP;
  }, []);

  const scrollBy = useCallback(
    (direction) => {
      scrollerRef.current?.scrollBy({ left: direction * step(), behavior: 'smooth' });
    },
    [step],
  );

  if (!properties.length) return null;

  return (
    <div className="relative">
      <div
        ref={scrollerRef}
        role="region"
        aria-label={ariaLabel}
        tabIndex={0}
        className="no-scrollbar flex snap-x snap-mandatory gap-5 overflow-x-auto pb-1 pt-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-champagne-400 focus-visible:ring-offset-4 focus-visible:ring-offset-white max-sm:-mx-5 max-sm:px-5 sm:cursor-grab"
      >
        {properties.map((property, index) => (
          <div
            key={property.id}
            className={[
              'flex-none snap-start',
              index === 0
                ? 'w-[86vw] max-w-[560px] sm:w-[420px] lg:w-[520px]'
                : 'w-[86vw] max-w-[420px] sm:w-[330px] lg:w-[380px]',
            ].join(' ')}
          >
            <PropertyCard
              property={property}
              variant={index === 0 ? 'featured' : 'default'}
              sizes={
                index === 0
                  ? '(min-width: 1024px) 520px, (min-width: 640px) 420px, 86vw'
                  : '(min-width: 1024px) 380px, (min-width: 640px) 330px, 86vw'
              }
              className="h-full"
            />
          </div>
        ))}
      </div>

      <div className="mt-8 flex items-center justify-between gap-6">
        <div className="relative h-px w-full max-w-[220px] bg-line" aria-hidden="true">
          <span
            className="absolute inset-y-0 left-0 bg-champagne-400 transition-[width] duration-200 ease-out"
            style={{ width: `${Math.max(progress * 100, 8)}%` }}
          />
        </div>

        <div className="flex items-center gap-3">
          <IconButton
            label="Previous properties"
            icon={ArrowLeft}
            variant="dark"
            onClick={() => scrollBy(-1)}
            disabled={edges.atStart}
            aria-disabled={edges.atStart}
            className={edges.atStart ? 'opacity-40' : ''}
          />
          <IconButton
            label="Next properties"
            icon={ArrowRight}
            variant="dark"
            onClick={() => scrollBy(1)}
            disabled={edges.atEnd}
            aria-disabled={edges.atEnd}
            className={edges.atEnd ? 'opacity-40' : ''}
          />
        </div>
      </div>
    </div>
  );
}

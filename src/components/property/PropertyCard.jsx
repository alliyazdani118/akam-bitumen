import { ArrowRight, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { photo, photoSrcSet } from '../../lib/images.js';
import { formatMillions } from '../../lib/format.js';
import FavoriteButton from '../ui/FavoriteButton.jsx';
import PropertySpecs from './PropertySpecs.jsx';

const VARIANTS = {
  default: {
    frame: 'aspect-[4/3]',
    body: 'p-5',
    title: 'text-[17px]',
    price: 'text-[17px]',
  },
  featured: {
    frame: 'aspect-[16/11] sm:aspect-[16/10]',
    body: 'p-6',
    title: 'text-[19px] sm:text-[22px]',
    price: 'text-[19px] sm:text-[21px]',
  },
  wide: {
    frame: 'aspect-[16/10]',
    body: 'p-6',
    title: 'text-[20px]',
    price: 'text-[19px]',
  },
};

/**
 * The single property card used everywhere — carousel, browse grid and the
 * "similar properties" row on the detail page.
 *
 * The whole card is one link; the save button sits outside it, above the link
 * layer, so it stays independently clickable.
 */
export default function PropertyCard({
  property,
  variant = 'default',
  sizes = '(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 92vw',
  priority = false,
  className = '',
}) {
  const styles = VARIANTS[variant] ?? VARIANTS.default;
  const primary = property.images[0];
  const detailPath = `/properties/${property.id}`;

  return (
    <article
      className={[
        'group relative flex flex-col overflow-hidden rounded-card border border-line bg-white transition-all duration-500 ease-premium hover:-translate-y-1.5 hover:border-navy-200 hover:shadow-lift',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <Link
        to={detailPath}
        aria-label={`${property.title}, ${property.location}, ${formatMillions(property.price)}`}
        className="flex flex-1 flex-col focus-visible:outline-none"
      >
        <div className={`media zoomable ${styles.frame}`}>
          <img
            src={photo(primary.id, 1280)}
            srcSet={photoSrcSet(primary.id)}
            sizes={sizes}
            alt={primary.alt}
            width={1280}
            height={854}
            loading={priority ? 'eager' : 'lazy'}
            decoding="async"
            fetchpriority={priority ? 'high' : 'auto'}
          />

          <div className="pointer-events-none absolute left-4 top-4 flex flex-wrap items-center gap-2">
            <span className="rounded-[2px] bg-navy-950/70 px-2.5 py-1.5 font-display text-[10px] font-semibold uppercase tracking-[0.16em] text-white backdrop-blur-sm">
              {property.type}
            </span>
            {property.featured ? (
              <span className="rounded-[2px] bg-champagne-400 px-2.5 py-1.5 font-display text-[10px] font-semibold uppercase tracking-[0.16em] text-ink">
                Featured
              </span>
            ) : null}
          </div>
        </div>

        <div className={`flex flex-1 flex-col ${styles.body}`}>
          <h3 className={`font-display font-bold leading-snug text-ink ${styles.title}`}>
            {property.title}
          </h3>

          <p className="mt-2 flex items-center gap-1.5 text-[13px] text-navy-500">
            <MapPin
              aria-hidden="true"
              className="h-3.5 w-3.5 shrink-0 text-champagne-500"
              strokeWidth={1.8}
            />
            {property.location}
          </p>

          <div className="mt-5 flex flex-wrap items-end justify-between gap-3 border-t border-line pt-4">
            <p className={`font-display font-extrabold tracking-[-0.015em] text-ink ${styles.price}`}>
              {formatMillions(property.price)}
            </p>
            <PropertySpecs property={property} className="hidden sm:flex" />
          </div>

          <p className="mt-3.5 flex items-center gap-2 font-display text-[11px] font-semibold uppercase tracking-[0.18em] text-navy-400 transition-colors duration-300 group-hover:text-champagne-600 sm:hidden">
            View details
            <ArrowRight aria-hidden="true" className="h-3.5 w-3.5" strokeWidth={2} />
          </p>
        </div>
      </Link>

      <div className="absolute right-4 top-4 z-10">
        <FavoriteButton propertyId={property.id} propertyTitle={property.title} />
      </div>
    </article>
  );
}

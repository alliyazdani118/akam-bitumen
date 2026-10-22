import { useMemo } from 'react';
import { Heart, SearchX } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import PageHero from '../components/layout/PageHero.jsx';
import PropertyCard from '../components/property/PropertyCard.jsx';
import PropertyFilters from '../components/property/PropertyFilters.jsx';
import Button from '../components/ui/Button.jsx';
import Reveal from '../components/ui/Reveal.jsx';
import { useFavorites } from '../context/FavoritesContext.jsx';
import {
  EMPTY_FILTERS,
  countActiveFilters,
  getCities,
  getTypes,
  searchProperties,
} from '../lib/api.js';

const HERO_IMAGE = 'photo-1580587771525-78b9dba3b914';

/**
 * Browse page. Filter state lives in the URL, so a search is shareable and the
 * back button steps through the way a user expects.
 */
export default function Properties() {
  const [params, setParams] = useSearchParams();
  const { favorites, count } = useFavorites();

  const filters = useMemo(
    () => ({
      query: params.get('query') ?? EMPTY_FILTERS.query,
      city: params.get('city') ?? EMPTY_FILTERS.city,
      type: params.get('type') ?? EMPTY_FILTERS.type,
      price: params.get('price') ?? EMPTY_FILTERS.price,
      bedrooms: params.get('bedrooms') ?? EMPTY_FILTERS.bedrooms,
      bathrooms: params.get('bathrooms') ?? EMPTY_FILTERS.bathrooms,
      sort: params.get('sort') ?? EMPTY_FILTERS.sort,
    }),
    [params],
  );

  const savedOnly = params.get('saved') === '1';

  const updateFilters = (patch) => {
    const next = new URLSearchParams(params);
    Object.entries(patch).forEach(([key, value]) => {
      if (!value || value === 'any' || value === EMPTY_FILTERS[key]) next.delete(key);
      else next.set(key, value);
    });
    setParams(next, { replace: true });
  };

  const resetFilters = () => setParams(new URLSearchParams(), { replace: true });

  const toggleSavedOnly = () => {
    const next = new URLSearchParams(params);
    if (savedOnly) next.delete('saved');
    else next.set('saved', '1');
    setParams(next, { replace: true });
  };

  const activeCount = countActiveFilters(filters);
  const matches = searchProperties(filters);
  const results = savedOnly ? matches.filter((item) => favorites.includes(item.id)) : matches;

  return (
    <>
      <PageHero
        eyebrow="Portfolio"
        title="Exceptional homes, currently available"
        copy="Twelve residences across the United States. Filter by location, budget or size — or search for something specific."
        imageId={HERO_IMAGE}
        breadcrumb={[{ label: 'Properties' }]}
      />

      <section className="section bg-paper" aria-label="Property search results">
        <div className="shell">
          <Reveal>
            <PropertyFilters
              filters={filters}
              onChange={updateFilters}
              onReset={resetFilters}
              cities={getCities()}
              types={getTypes()}
              activeCount={activeCount}
              resultCount={results.length}
            />
          </Reveal>

          {count > 0 || savedOnly ? (
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={toggleSavedOnly}
                aria-pressed={savedOnly}
                className={[
                  'inline-flex items-center gap-2.5 rounded-full border px-4 py-2.5 font-display text-[11px] font-semibold uppercase tracking-[0.16em] transition-all duration-300 ease-premium',
                  savedOnly
                    ? 'border-champagne-400 bg-champagne-400 text-ink'
                    : 'border-line bg-white text-navy-500 hover:border-navy-300 hover:text-ink',
                ].join(' ')}
              >
                <Heart
                  aria-hidden="true"
                  className="h-3.5 w-3.5"
                  strokeWidth={1.9}
                  fill={savedOnly ? 'currentColor' : 'none'}
                />
                Saved properties ({count})
              </button>

              {savedOnly ? (
                <p className="text-[13px] text-navy-500">
                  Showing only the properties you have saved.
                </p>
              ) : null}
            </div>
          ) : null}

          {results.length > 0 ? (
            <ul className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {results.map((property, index) => (
                <li key={property.id}>
                  <Reveal delay={Math.min(index, 5) * 60} className="h-full">
                    <PropertyCard
                      property={property}
                      priority={index < 3}
                      className="h-full"
                      sizes="(min-width: 1280px) 30vw, (min-width: 640px) 45vw, 92vw"
                    />
                  </Reveal>
                </li>
              ))}
            </ul>
          ) : (
            <div className="mt-10 rounded-card border border-line bg-white px-7 py-16 text-center">
              <span className="inline-flex h-14 w-14 items-center justify-center rounded-full border border-line text-navy-300">
                <SearchX aria-hidden="true" className="h-6 w-6" strokeWidth={1.5} />
              </span>
              <h2 className="mt-6 font-display text-[20px] font-bold text-ink">
                {savedOnly ? 'No saved properties yet' : 'No properties match those filters'}
              </h2>
              <p className="mx-auto mt-3 max-w-md text-[14.5px] leading-relaxed text-navy-500">
                {savedOnly
                  ? 'Tap the heart on any property to keep it here for later.'
                  : 'Try widening the price range or clearing a filter — or talk to an advisor about off-market options.'}
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                {savedOnly ? (
                  <Button to="/properties" variant="primary">
                    Browse all properties
                  </Button>
                ) : (
                  <Button variant="primary" onClick={resetFilters}>
                    Clear filters
                  </Button>
                )}
                <Button to="/contact" variant="outlineDark">
                  Speak to an advisor
                </Button>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

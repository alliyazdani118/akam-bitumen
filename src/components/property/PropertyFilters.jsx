import { useState } from 'react';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { PRICE_BANDS, SORT_OPTIONS } from '../../lib/api.js';
import { pluralize } from '../../lib/format.js';

const BEDROOM_OPTIONS = [
  { value: 'any', label: 'Any' },
  { value: '2', label: '2+ bedrooms' },
  { value: '3', label: '3+ bedrooms' },
  { value: '4', label: '4+ bedrooms' },
  { value: '5', label: '5+ bedrooms' },
  { value: '6', label: '6+ bedrooms' },
];

const BATHROOM_OPTIONS = [
  { value: 'any', label: 'Any' },
  { value: '2', label: '2+ bathrooms' },
  { value: '3', label: '3+ bathrooms' },
  { value: '4', label: '4+ bathrooms' },
  { value: '5', label: '5+ bathrooms' },
];

function SelectField({ id, label, value, options, onChange }) {
  return (
    <div>
      <label htmlFor={id} className="field-label">
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="field cursor-pointer appearance-none bg-[length:11px] bg-[right_0.9rem_center] bg-no-repeat pr-9"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 8'%3E%3Cpath d='M1 1.5 6 6.5l5-5' fill='none' stroke='%2363839F' stroke-width='1.4' stroke-linecap='round'/%3E%3C/svg%3E\")",
        }}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

/**
 * Browse-page filter bar. Filters are owned by the page (and mirrored in the
 * URL) so search results are shareable and the back button behaves.
 */
export default function PropertyFilters({
  filters,
  onChange,
  onReset,
  cities,
  types,
  activeCount,
  resultCount,
}) {
  const [expanded, setExpanded] = useState(false);

  const cityOptions = [
    { value: 'any', label: 'Any location' },
    ...cities.map((city) => ({ value: city.value, label: `${city.label} (${city.count})` })),
  ];

  const typeOptions = [
    { value: 'any', label: 'Any type' },
    ...types.map((type) => ({ value: type, label: type })),
  ];

  return (
    <section
      aria-label="Property filters"
      className="rounded-card border border-line bg-white p-5 shadow-card sm:p-6"
    >
      <div className="grid gap-4 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <label htmlFor="property-search" className="field-label">
            Search
          </label>
          <div className="relative">
            <Search
              aria-hidden="true"
              className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-navy-300"
              strokeWidth={1.9}
            />
            <input
              id="property-search"
              type="search"
              value={filters.query}
              onChange={(event) => onChange({ query: event.target.value })}
              placeholder="Search by name, city or type…"
              className="field pl-10 pr-10 [&::-webkit-search-cancel-button]:hidden"
            />
            {filters.query ? (
              <button
                type="button"
                onClick={() => onChange({ query: '' })}
                aria-label="Clear search"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-navy-300 transition-colors hover:text-ink"
              >
                <X aria-hidden="true" className="h-4 w-4" strokeWidth={2} />
              </button>
            ) : null}
          </div>
        </div>

        <div className="lg:col-span-3">
          <SelectField
            id="property-sort"
            label="Sort by"
            value={filters.sort}
            options={SORT_OPTIONS}
            onChange={(value) => onChange({ sort: value })}
          />
        </div>

        <div className="lg:hidden">
          <span className="field-label">&nbsp;</span>
          <button
            type="button"
            onClick={() => setExpanded((value) => !value)}
            aria-expanded={expanded}
            aria-controls="property-filter-panel"
            className="field flex items-center justify-between text-left"
          >
            <span className="flex items-center gap-2">
              <SlidersHorizontal aria-hidden="true" className="h-4 w-4 text-champagne-500" strokeWidth={1.9} />
              Filters
              {activeCount > 0 ? (
                <span className="inline-flex h-5 min-w-[20px] items-center justify-center rounded-full bg-champagne-400 px-1.5 font-display text-[10.5px] font-bold text-ink">
                  {activeCount}
                </span>
              ) : null}
            </span>
            <span aria-hidden="true" className="text-navy-300">
              {expanded ? '−' : '+'}
            </span>
          </button>
        </div>
      </div>

      <div
        id="property-filter-panel"
        className={`mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-5 ${expanded ? 'grid' : 'hidden lg:grid'}`}
      >
        <SelectField
          id="property-city"
          label="Location"
          value={filters.city}
          options={cityOptions}
          onChange={(value) => onChange({ city: value })}
        />
        <SelectField
          id="property-type"
          label="Property type"
          value={filters.type}
          options={typeOptions}
          onChange={(value) => onChange({ type: value })}
        />
        <SelectField
          id="property-price"
          label="Price range"
          value={filters.price}
          options={PRICE_BANDS}
          onChange={(value) => onChange({ price: value })}
        />
        <SelectField
          id="property-bedrooms"
          label="Bedrooms"
          value={filters.bedrooms}
          options={BEDROOM_OPTIONS}
          onChange={(value) => onChange({ bedrooms: value })}
        />
        <SelectField
          id="property-bathrooms"
          label="Bathrooms"
          value={filters.bathrooms}
          options={BATHROOM_OPTIONS}
          onChange={(value) => onChange({ bathrooms: value })}
        />
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-4">
        <p aria-live="polite" className="text-[13px] text-navy-500">
          <span className="font-display font-semibold text-ink">
            {pluralize(resultCount || 0, 'property', 'properties')}
          </span>{' '}
          {activeCount > 0 ? 'match your filters' : 'available now'}
        </p>

        <button
          type="button"
          onClick={onReset}
          disabled={activeCount === 0}
          className="inline-flex items-center gap-1.5 font-display text-[11px] font-semibold uppercase tracking-[0.18em] text-navy-500 transition-colors duration-300 hover:text-ink disabled:cursor-not-allowed disabled:opacity-40"
        >
          <X aria-hidden="true" className="h-3.5 w-3.5" strokeWidth={2} />
          Clear filters
        </button>
      </div>
    </section>
  );
}

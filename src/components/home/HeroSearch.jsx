import { useState } from 'react';
import { Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { PRICE_BANDS } from '../../lib/api.js';
import { PROPERTY_TYPES } from '../../data/properties.js';

/** Working property search that hands the query to the browse page. */
export default function HeroSearch() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [type, setType] = useState('any');
  const [price, setPrice] = useState('any');

  const handleSubmit = (event) => {
    event.preventDefault();
    const params = new URLSearchParams();
    if (query.trim()) params.set('query', query.trim());
    if (type !== 'any') params.set('type', type);
    if (price !== 'any') params.set('price', price);
    const search = params.toString();
    navigate(`/properties${search ? `?${search}` : ''}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      role="search"
      aria-label="Search properties"
      className="rounded-card border border-white/15 bg-white/95 p-3.5 shadow-lift backdrop-blur-md sm:p-4"
    >
      <div className="grid gap-3 lg:grid-cols-[1.5fr_1fr_1fr_auto]">
        <div className="relative lg:col-span-1">
          <label htmlFor="hero-search-query" className="sr-only">
            Search by city, property name or type
          </label>
          <Search
            aria-hidden="true"
            className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-navy-300"
            strokeWidth={1.9}
          />
          <input
            id="hero-search-query"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="City, property name or type"
            className="field border-transparent bg-transparent py-3.5 pl-11 [&::-webkit-search-cancel-button]:hidden"
          />
        </div>

        <div>
          <label htmlFor="hero-search-type" className="sr-only">
            Property type
          </label>
          <select
            id="hero-search-type"
            value={type}
            onChange={(event) => setType(event.target.value)}
            className="field cursor-pointer border-transparent bg-transparent py-3.5"
          >
            <option value="any">Any property type</option>
            {PROPERTY_TYPES.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="hero-search-price" className="sr-only">
            Price range
          </label>
          <select
            id="hero-search-price"
            value={price}
            onChange={(event) => setPrice(event.target.value)}
            className="field cursor-pointer border-transparent bg-transparent py-3.5"
          >
            {PRICE_BANDS.map((band) => (
              <option key={band.value} value={band.value}>
                {band.label}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className="btn btn-primary w-full lg:w-auto">
          <Search aria-hidden="true" className="h-[15px] w-[15px]" strokeWidth={2} />
          Search
        </button>
      </div>
    </form>
  );
}

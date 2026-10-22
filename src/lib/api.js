/**
 * Data access layer.
 *
 * Everything the UI needs about listings comes through this module, so the
 * data source can be replaced (a database, an API, a CMS) without touching a
 * single component. The functions are synchronous today because the catalogue
 * is a local module; they are shaped like queries so making them `async` later
 * is a change to this file only.
 */

import { PROPERTY_TYPES, properties } from '../data/properties.js';
import { team } from '../data/site.js';

const BY_PRICE = {
  'under-2': [0, 2_000_000],
  '2-4': [2_000_000, 4_000_000],
  '4-6': [4_000_000, 6_000_000],
  'over-6': [6_000_000, Number.POSITIVE_INFINITY],
};

export const PRICE_BANDS = [
  { value: 'any', label: 'Any price' },
  { value: 'under-2', label: 'Under $2M' },
  { value: '2-4', label: '$2M – $4M' },
  { value: '4-6', label: '$4M – $6M' },
  { value: 'over-6', label: '$6M and above' },
];

export const SORT_OPTIONS = [
  { value: 'featured', label: 'Featured first' },
  { value: 'price-desc', label: 'Price: high to low' },
  { value: 'price-asc', label: 'Price: low to high' },
  { value: 'area-desc', label: 'Largest first' },
  { value: 'newest', label: 'Newest build' },
];

export const EMPTY_FILTERS = {
  query: '',
  city: 'any',
  type: 'any',
  price: 'any',
  bedrooms: 'any',
  bathrooms: 'any',
  sort: 'featured',
};

/** Every listing in the catalogue. */
export function getAllProperties() {
  return properties;
}

/** A single listing by its slug. */
export function getPropertyById(id) {
  return properties.find((property) => property.id === id) ?? null;
}

/** The properties shown in the homepage carousel. */
export function getFeaturedProperties(limit = 8) {
  const featured = properties.filter((property) => property.featured);
  const rest = properties.filter((property) => !property.featured);
  return [...featured, ...rest].slice(0, limit);
}

/** The team member responsible for a listing. */
export function getAgentById(id) {
  return team.find((member) => member.id === id) ?? null;
}

/** Distinct cities, ordered by the number of listings in each. */
export function getCities() {
  const counts = new Map();
  properties.forEach((property) => {
    const key = `${property.city}, ${property.state}`;
    counts.set(key, (counts.get(key) ?? 0) + 1);
  });
  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .map(([label, count]) => ({ value: label, label, count }));
}

/** Property types that actually appear in the catalogue. */
export function getTypes() {
  const present = new Set(properties.map((property) => property.type));
  return PROPERTY_TYPES.filter((type) => present.has(type));
}

function matchesQuery(property, query) {
  const haystack = [
    property.title,
    property.city,
    property.state,
    property.location,
    property.type,
    property.tagline,
    ...property.tags,
  ]
    .join(' ')
    .toLowerCase();
  return query
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)
    .every((term) => haystack.includes(term));
}

function sortProperties(list, sort) {
  const sorted = [...list];
  switch (sort) {
    case 'price-asc':
      return sorted.sort((a, b) => a.price - b.price);
    case 'price-desc':
      return sorted.sort((a, b) => b.price - a.price);
    case 'area-desc':
      return sorted.sort((a, b) => b.area - a.area);
    case 'newest':
      return sorted.sort((a, b) => b.yearBuilt - a.yearBuilt);
    default:
      return sorted.sort((a, b) => Number(b.featured) - Number(a.featured) || b.price - a.price);
  }
}

/** Applies the browse-page filters and returns the matching listings. */
export function searchProperties(filters = EMPTY_FILTERS) {
  const {
    query = '',
    city = 'any',
    type = 'any',
    price = 'any',
    bedrooms = 'any',
    bathrooms = 'any',
    sort = 'featured',
  } = filters;

  const [minPrice, maxPrice] = BY_PRICE[price] ?? [0, Number.POSITIVE_INFINITY];
  const minBeds = bedrooms === 'any' ? 0 : Number(bedrooms);
  const minBaths = bathrooms === 'any' ? 0 : Number(bathrooms);

  const results = properties.filter((property) => {
    if (query.trim() && !matchesQuery(property, query.trim())) return false;
    if (city !== 'any' && `${property.city}, ${property.state}` !== city) return false;
    if (type !== 'any' && property.type !== type) return false;
    if (property.price < minPrice || property.price > maxPrice) return false;
    if (property.bedrooms < minBeds) return false;
    if (property.bathrooms < minBaths) return false;
    return true;
  });

  return sortProperties(results, sort);
}

/** How many filters are away from their default value. */
export function countActiveFilters(filters = EMPTY_FILTERS) {
  return Object.entries(filters).filter(
    ([key, value]) => key !== 'sort' && value !== EMPTY_FILTERS[key],
  ).length;
}

/** Nearest listings to a given property — same city first, then same type. */
export function getSimilarProperties(property, limit = 3) {
  if (!property) return [];
  const others = properties.filter((item) => item.id !== property.id);
  const score = (item) => {
    let value = 0;
    if (item.city === property.city) value += 4;
    if (item.state === property.state) value += 2;
    if (item.type === property.type) value += 2;
    value -= Math.abs(item.price - property.price) / 2_000_000;
    return value;
  };
  return [...others].sort((a, b) => score(b) - score(a)).slice(0, limit);
}

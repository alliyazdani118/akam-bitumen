/** Presentation-level formatting helpers. */

const usd = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
});

/** $2,350,000 */
export function formatUsd(value) {
  return usd.format(value);
}

/** $2.35 Million */
export function formatMillions(value) {
  const millions = value / 1_000_000;
  const rounded = millions >= 10 ? millions.toFixed(1) : millions.toFixed(2);
  const trimmed = rounded.replace(/\.0$/, '').replace(/(\.\d)0$/, '$1');
  return `$${trimmed} Million`;
}

/** $2.35M */
export function formatCompact(value) {
  return formatMillions(value).replace(' Million', 'M');
}

export function formatArea(sqft) {
  return `${new Intl.NumberFormat('en-US').format(sqft)} sq ft`;
}

export function pluralize(count, singular, plural = `${singular}s`) {
  return `${count} ${count === 1 ? singular : plural}`;
}

/** Turns a title into a URL-safe slug (used when creating new records). */
export function slugify(value) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

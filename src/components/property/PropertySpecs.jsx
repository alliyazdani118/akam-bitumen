import { Bath, BedDouble, Ruler } from 'lucide-react';
import { formatArea } from '../../lib/format.js';

/**
 * Bed / bath / area readout, used on cards, carousels and the detail page.
 *  - `icons` — compact inline row for cards
 *  - `grid`  — labelled grid for the property detail header
 */
export default function PropertySpecs({ property, variant = 'icons', className = '' }) {
  const items = [
    { key: 'beds', icon: BedDouble, value: `${property.bedrooms}`, label: 'Bedrooms' },
    { key: 'baths', icon: Bath, value: `${property.bathrooms}`, label: 'Bathrooms' },
    { key: 'area', icon: Ruler, value: formatArea(property.area), label: 'Interior' },
  ];

  if (variant === 'grid') {
    const gridItems = [
      ...items,
      { key: 'type', icon: null, value: property.type, label: 'Property type' },
      { key: 'year', icon: null, value: `${property.yearBuilt}`, label: 'Year built' },
      { key: 'lot', icon: null, value: property.lot, label: 'Lot size' },
    ];

    return (
      <dl className={`grid grid-cols-2 gap-x-6 gap-y-7 sm:grid-cols-3 ${className}`.trim()}>
        {gridItems.map((item) => (
          <div key={item.key} className="border-l border-line pl-4">
            <dt className="font-display text-[10.5px] font-semibold uppercase tracking-[0.2em] text-navy-400">
              {item.label}
            </dt>
            <dd className="mt-1.5 flex items-center gap-2 font-display text-[16px] font-bold text-ink">
              {item.icon ? (
                <item.icon aria-hidden="true" className="h-4 w-4 text-champagne-500" strokeWidth={1.7} />
              ) : null}
              {item.value}
            </dd>
          </div>
        ))}
      </dl>
    );
  }

  return (
    <ul className={`flex items-center gap-4 text-[12.5px] text-navy-500 ${className}`.trim()}>
      {items.map((item) => (
        <li key={item.key} className="flex items-center gap-1.5" title={item.label}>
          <item.icon aria-hidden="true" className="h-[15px] w-[15px] text-champagne-500" strokeWidth={1.7} />
          <span>{item.value}</span>
          <span className="sr-only">{item.label}</span>
        </li>
      ))}
    </ul>
  );
}

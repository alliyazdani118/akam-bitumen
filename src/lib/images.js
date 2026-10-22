/**
 * Photography.
 *
 * Images are served from the Unsplash CDN with a responsive `srcset`; every
 * usage sits on a dark background colour, so a slow or blocked image degrades
 * to the section background rather than a broken frame.
 */

const CDN = 'https://images.unsplash.com';

function buildUrl(id, { w = 1600, q = 78, h } = {}) {
  const params = ['auto=format', 'fit=crop', `w=${w}`, `q=${q}`];
  if (h) params.push(`h=${h}`);
  return `${CDN}/${id}?${params.join('&')}`;
}

/** id + alt text for each photograph the site uses. */
export const photos = {
  hero: {
    id: 'photo-1759956214507-af3b18cf292f',
    alt: 'Offshore petroleum platform and support vessel silhouetted against an orange sunset over dark ocean water',
  },
  refinery: {
    id: 'photo-1786532852011-443cba5dc9fe',
    alt: 'Refinery storage tanks and pipework under a warm golden sky',
  },
  pipes: {
    id: 'photo-1768128834332-7d3479c8d634',
    alt: 'Industrial plant illuminated at night, showing pipework and steel structures',
  },
  pumpjack: {
    id: 'photo-1516199423456-1f1e91b06f25',
    alt: 'Oil pump jack silhouetted against a red sunset',
  },
  facility: {
    id: 'photo-1777195148867-68a6f0e9aa8f',
    alt: 'Oil refinery and storage tanks beside the water at dusk',
  },
  newsletter: {
    id: 'photo-1516937941344-00b4e0337589',
    alt: 'Industrial plant with stacks and pipework under a dark cloudy sky',
  },
  portraitRichard: {
    id: 'photo-1560250097-0b93528c311a',
    alt: 'Portrait of a procurement manager in a business suit',
  },
  portraitNathan: {
    id: 'photo-1600878459138-e1123b37cb30',
    alt: 'Portrait of a construction director in a dark suit jacket',
  },
  portraitKelly: {
    id: 'photo-1585240975858-7264fd020798',
    alt: 'Portrait of a business development manager in a dark blazer',
  },
};

/** Single image URL for a background or a simple <img>. */
export function photoUrl(key, options) {
  const photo = photos[key];
  if (!photo) return '';
  return buildUrl(photo.id, options);
}

/** `src` + `srcSet` pair for a responsive <img>. */
export function photoSource(key, { widths = [640, 960, 1280, 1600], ...options } = {}) {
  const photo = photos[key];
  if (!photo) return { src: '', srcSet: '' };
  const largest = widths[widths.length - 1];
  return {
    src: buildUrl(photo.id, { ...options, w: largest }),
    srcSet: widths.map((w) => `${buildUrl(photo.id, { ...options, w })} ${w}w`).join(', '),
  };
}

export function photoAlt(key) {
  return photos[key]?.alt ?? '';
}

/**
 * Image helpers.
 *
 * Photography is served by the Unsplash CDN, which resizes on the fly. Every
 * image is requested at the width it is actually displayed at and the layout
 * reserves its aspect ratio up front, so the page never shifts while loading.
 */

const CDN = 'https://images.unsplash.com';

/** Default widths used for the responsive `srcset` of a property image. */
export const PHOTO_WIDTHS = [640, 960, 1280, 1600, 2000];

export function photo(id, width = 1280, quality = 78) {
  return `${CDN}/${id}?auto=format&fit=crop&w=${width}&q=${quality}&fm=webp`;
}

export function photoSrcSet(id, widths = PHOTO_WIDTHS, quality = 78) {
  return widths.map((w) => `${photo(id, w, quality)} ${w}w`).join(', ');
}

/**
 * Face-aware crop for team and testimonial portraits — the CDN centres the
 * crop on the subject's face at whatever aspect ratio is requested.
 */
export function portrait(id, width = 480, height = width) {
  return `${CDN}/${id}?auto=format&fit=facearea&facepad=3.2&w=${width}&h=${height}&q=80&fm=webp`;
}

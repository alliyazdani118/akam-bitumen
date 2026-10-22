# Horizon Properties

A premium real-estate agency website: editorial homepage, property browsing with filters,
property detail pages with a full-screen gallery, plus About, Services, Team and Contact.

## Stack

- **React 18** + **Vite 6**
- **Tailwind CSS 3** — design tokens (navy / champagne / ivory palette, type scale, radii,
  shadows, motion) live in `tailwind.config.js`; shared primitives in `src/index.css`
- **react-router 6** — client-side routing, filters mirrored into the URL
- **lucide-react** — line icons

## Getting started

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # production bundle in dist/
npm run preview   # serve the built bundle
```

## Project structure

| Path | Purpose |
| --- | --- |
| `src/data/properties.js` | The property catalogue — the single source of truth for listings |
| `src/data/site.js` | Brand, navigation, services, team, testimonials, stats |
| `src/lib/api.js` | Data-access layer: queries, filters, sorting, similar properties |
| `src/lib/images.js` | Responsive CDN image URLs (`srcset` helper) |
| `src/lib/inquiries.js` | Inquiry + newsletter submission |
| `src/lib/storage.js` | Safe localStorage helpers |
| `src/context/FavoritesContext.jsx` | Saved properties, shared app-wide |
| `src/components/` | `layout/`, `ui/`, `property/`, `home/`, `contact/` |
| `src/pages/` | One file per route |

## How the pieces connect

- Components never import the catalogue directly — everything goes through `src/lib/api.js`,
  so connecting a real database or API later means changing that one module.
- Saved properties persist under the `horizon:favorites` localStorage key; the heart in the
  header links to `/properties?saved=1`.
- Browse filters (`query`, `city`, `type`, `price`, `bedrooms`, `bathrooms`, `sort`) live in
  the URL, so searches are shareable and the back button behaves.
- Inquiry and newsletter submissions go through `src/lib/inquiries.js` — the seam where a
  CRM or backend would be plugged in. Nothing on the site is a dead control.
- Photography is served from the Unsplash CDN with a responsive `srcset` and explicit
  aspect-ratio containers, and below-the-fold images are lazy-loaded.

## Development environment

In this workspace the app runs through a Docker Compose setup kept **outside** the
repository (the Base44 sandbox environment): it bind-mounts this checkout, installs
dependencies on start, and runs the Vite dev server on host port 3000 with the preview's
host/origin allowlisted. `vite.config.js` only applies those preview-specific settings when
`BASE44_PREVIEW_MODE=1`; unset, it is a stock Vite config.

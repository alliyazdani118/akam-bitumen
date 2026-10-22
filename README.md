# AKAM BITUMEN CO.

Premium industrial website for a bitumen and petroleum supply company: a cinematic homepage,
six service lines with their own detail pages, statistics, testimonials, a newsletter, and a
four-column footer — all on a black-and-orange industrial palette.

## Stack

- **React 18** + **Vite 6** — SPA with client-side routing
- **Tailwind CSS 3** — the whole design system (surfaces, brand orange, type, radii, motion)
  lives in `tailwind.config.js`; shared primitives in `src/index.css`
- **react-router 6** — one route per page, clean URLs
- **lucide-react** — one outline icon set throughout
- **Express + Postgres** in `server/` — stores newsletter subscriptions and contact enquiries

## Getting started

```bash
npm install
npm run api:dev     # JSON API on :4000 (needs DATABASE_URL, see server/db.js)
npm run dev         # site on http://localhost:5173, proxies /api to the API
npm run build       # production bundle in dist/
```

## Pages

| Route | Content |
| --- | --- |
| `/` | Hero, services, statistics banner, why choose us, testimonials, newsletter |
| `/services` | All six service lines |
| `/services/:slug` | Service detail: overview, coverage, enquiry sidebar, other services |
| `/about` | Company overview, mission, values, why choose us, statistics |
| `/projects` | Supply programmes / capability areas |
| `/testimonials` | Client feedback (sample content, flagged as such) |
| `/contact` | Contact details and the quote-request form |
| `/faq` | Product, shipping and ordering questions (deep-linkable anchors) |
| `/privacy-policy`, `/cookie-policy`, `/terms-of-use` | Small legal pages |

## Project structure

| Path | Purpose |
| --- | --- |
| `src/data/site.js` | Brand, contact details, navigation, footer columns |
| `src/data/services.js` | The six services, card copy and detail-page content |
| `src/data/content.js` | Section copy: hero, statistics, features, testimonials, programmes |
| `src/data/infoPages.js` | FAQ entries and the legal pages |
| `src/lib/images.js` | Photograph ids, alt text and responsive `srcset` helpers |
| `src/lib/api.js` | Newsletter + enquiry client (talks to `/api`, same origin) |
| `src/lib/search.js` | Index and matcher behind the header search |
| `src/components/layout/` | Header (nav, dropdowns, search, mobile drawer), footer, banners |
| `src/components/home/` | Homepage sections |
| `src/components/ui/` | Button, icon registry, reveal-on-scroll, statistic ring, labels |
| `server/` | Express API; `server/db.js` creates the schema on boot |

## Content to replace before launch

- **Contact details** (`src/data/site.js`): phone, email, address and website are placeholders.
- **Social profiles**: the hrefs point at the platform home pages; use the company's own pages.
- **Statistics** (`src/data/content.js`): sample marketing figures, not verified company data.
- **Testimonials**: sample copy used for layout, not verified customer statements.
- **Legal pages**: placeholder text, flagged on the page itself, pending review.

No certification, award, approval or membership is claimed anywhere on the site.

## Forms

Both forms post to the API in `server/` and store their data in Postgres (`subscribers`,
`enquiries`). The UI only reports success once the API has confirmed the write; a failure shows
an error message instead of a false confirmation.

## Accessibility and SEO

Semantic landmarks and heading order (one `h1` per page), labelled form fields and controls,
visible focus styles, keyboard-operable navigation, dropdowns, search and carousel, `alt` text on
every photograph, reduced-motion support, plus per-route document titles and meta description.

## Development environment

In this workspace the app runs through a Docker Compose setup kept **outside** the repository
(the Base44 sandbox environment): it bind-mounts this checkout, installs dependencies on start
and runs the Vite dev server on host port 3000 with the preview's host/origin allowlisted, next
to the API and a local Postgres. `vite.config.js` only applies preview-specific settings when
`BASE44_PREVIEW_MODE=1`; unset, it is a stock Vite config that proxies `/api` to `localhost:4000`.

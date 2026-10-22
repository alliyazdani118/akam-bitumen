import { useEffect } from 'react';
import { site } from '../data/site.js';

/** Keeps the document title (and meta description) in step with the route. */
export default function useDocumentTitle(pageTitle, description) {
  useEffect(() => {
    document.title = pageTitle
      ? `${pageTitle} | ${site.name}`
      : `${site.name} | Bitumen Supply & Industrial Solutions`;

    const tag = document.querySelector('meta[name="description"]');
    if (tag) tag.setAttribute('content', description || site.description);
  }, [pageTitle, description]);
}

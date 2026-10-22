import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Footer from './Footer.jsx';
import Header from './Header.jsx';

/**
 * Scrolls to the top on route change, or to the element named by the hash so
 * in-page anchors from the footer and services work with client-side routing.
 */
function ScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const target = document.getElementById(hash.slice(1));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [pathname, hash]);

  return null;
}

export default function Layout() {
  return (
    <div className="flex min-h-screen flex-col bg-paper">
      <ScrollManager />

      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-5 focus:top-5 focus:z-[60] focus:rounded-control focus:bg-ink focus:px-5 focus:py-3 focus:font-display focus:text-[12px] focus:font-semibold focus:uppercase focus:tracking-[0.16em] focus:text-white"
      >
        Skip to content
      </a>

      <Header />
      <main id="main-content" className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

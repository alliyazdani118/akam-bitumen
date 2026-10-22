import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ArrowRight, ChevronDown, Mail, Menu, Phone, Search, X } from 'lucide-react';
import { navigation, site } from '../../data/site.js';
import { searchSite } from '../../lib/search.js';
import useBodyScrollLock from '../../hooks/useBodyScrollLock.js';
import SocialLinks from './SocialLinks.jsx';

const BAR_HEIGHT = 'h-[76px]';

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const [openMenu, setOpenMenu] = useState(null);
  const [openSection, setOpenSection] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const searchInputRef = useRef(null);

  useBodyScrollLock(mobileOpen || searchOpen);

  // Any navigation closes whatever is open.
  useEffect(() => {
    setMobileOpen(false);
    setSearchOpen(false);
    setOpenMenu(null);
    setOpenSection(null);
  }, [location.pathname, location.hash]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!searchOpen) return undefined;
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setSearchOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    const frame = requestAnimationFrame(() => searchInputRef.current?.focus());
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      cancelAnimationFrame(frame);
    };
  }, [searchOpen]);

  const results = useMemo(() => searchSite(query), [query]);

  const isActive = (item) =>
    (item.match ?? [item.href]).some((prefix) =>
      prefix === '/' ? location.pathname === '/' : location.pathname.startsWith(prefix),
    );

  const goTo = (href) => {
    setSearchOpen(false);
    setQuery('');
    navigate(href);
  };

  const onSearchSubmit = (event) => {
    event.preventDefault();
    if (results.length > 0) goTo(results[0].href);
  };

  return (
    <header className="sticky top-0 z-50">
      {/* Utility strip — contact details and social profiles */}
      <div className="hidden border-b border-hairline bg-deep lg:block">
        <div className="shell flex h-10 items-center justify-between text-[11.5px] text-faint">
          <div className="flex items-center gap-7">
            <a
              href={site.phone.href}
              className="flex items-center gap-2 transition-colors duration-200 ease-premium hover:text-brand-500"
            >
              <Phone className="h-3.5 w-3.5 text-brand-500" strokeWidth={1.8} aria-hidden="true" />
              {site.phone.label}
            </a>
            <a
              href={site.email.href}
              className="flex items-center gap-2 transition-colors duration-200 ease-premium hover:text-brand-500"
            >
              <Mail className="h-3.5 w-3.5 text-brand-500" strokeWidth={1.8} aria-hidden="true" />
              {site.email.label}
            </a>
          </div>
          <SocialLinks />
        </div>
      </div>

      {/* Main bar */}
      <div
        className={`border-b border-hairline bg-base/95 backdrop-blur transition-shadow duration-300 ease-premium ${
          scrolled ? 'shadow-header' : ''
        }`}
      >
        <div className={`shell flex ${BAR_HEIGHT} items-center justify-between gap-4`}>
          <Link to="/" className="flex shrink-0 items-center gap-3" aria-label={`${site.name} — home`}>
            <img
              src={site.logo}
              alt={site.logoAlt}
              width="358"
              height="542"
              className="h-10 w-auto lg:h-11"
            />
            <span className="hidden flex-col leading-none sm:flex">
              <span className="text-[15px] font-extrabold tracking-[0.01em] text-ink">AKAM</span>
              <span className="mt-1 text-[9.5px] font-semibold uppercase tracking-[0.3em] text-brand-500">
                Bitumen Co.
              </span>
            </span>
          </Link>

          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center">
              {navigation.map((item) => {
                const active = isActive(item);
                if (!item.children) {
                  return (
                    <li key={item.label}>
                      <Link
                        to={item.href}
                        className={`group relative flex ${BAR_HEIGHT} items-center px-3.5 text-[12.5px] font-medium uppercase tracking-[0.14em] transition-colors duration-200 ease-premium ${
                          active ? 'text-brand-500' : 'text-[#D5D9DD] hover:text-brand-500'
                        }`}
                        aria-current={active ? 'page' : undefined}
                      >
                        {item.label}
                        <span
                          aria-hidden="true"
                          className={`absolute inset-x-3 bottom-0 h-[2px] origin-left bg-brand-500 transition-transform duration-300 ease-premium ${
                            active ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                          }`}
                        />
                      </Link>
                    </li>
                  );
                }

                const open = openMenu === item.label;
                return (
                  <li
                    key={item.label}
                    onMouseEnter={() => setOpenMenu(item.label)}
                    onMouseLeave={() => setOpenMenu((current) => (current === item.label ? null : current))}
                  >
                    <div className={`relative flex ${BAR_HEIGHT} items-center`}>
                      <Link
                        to={item.href}
                        className={`group relative flex ${BAR_HEIGHT} items-center pl-3.5 text-[12.5px] font-medium uppercase tracking-[0.14em] transition-colors duration-200 ease-premium ${
                          active ? 'text-brand-500' : 'text-[#D5D9DD] hover:text-brand-500'
                        }`}
                        aria-current={active ? 'page' : undefined}
                      >
                        {item.label}
                        <span
                          aria-hidden="true"
                          className={`absolute inset-x-3 bottom-0 h-[2px] origin-left bg-brand-500 transition-transform duration-300 ease-premium ${
                            active ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                          }`}
                        />
                      </Link>
                      <button
                        type="button"
                        aria-haspopup="true"
                        aria-expanded={open}
                        aria-label={`${item.label} submenu`}
                        onClick={() => setOpenMenu(open ? null : item.label)}
                        onKeyDown={(event) => {
                          if (event.key === 'Escape') setOpenMenu(null);
                        }}
                        className="flex h-full items-center px-2 pr-3.5 text-brand-500"
                      >
                        <ChevronDown
                          className={`h-3.5 w-3.5 transition-transform duration-300 ease-premium ${
                            open ? 'rotate-180' : ''
                          }`}
                          strokeWidth={2}
                          aria-hidden="true"
                        />
                      </button>

                      {open ? (
                        <ul className="absolute left-0 top-full z-50 w-64 animate-fade-in border border-line bg-deep/98 py-2 shadow-header">
                          {item.children.map((child) => (
                            <li key={child.href}>
                              <Link
                                to={child.href}
                                className="group flex items-center justify-between gap-3 px-4 py-2.5 text-[12.5px] text-muted transition-colors duration-200 ease-premium hover:bg-white/5 hover:text-brand-500"
                              >
                                {child.label}
                                <ArrowRight
                                  className="h-3.5 w-3.5 text-brand-500 opacity-0 transition-opacity duration-200 ease-premium group-hover:opacity-100"
                                  aria-hidden="true"
                                />
                              </Link>
                            </li>
                          ))}
                        </ul>
                      ) : null}
                    </div>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              aria-label="Search this website"
              className="flex h-10 w-10 items-center justify-center border border-line text-muted transition-colors duration-200 ease-premium hover:border-brand-500 hover:text-brand-500"
            >
              <Search className="h-4 w-4" strokeWidth={1.8} aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
              aria-expanded={mobileOpen}
              className="flex h-10 w-10 items-center justify-center border border-line text-ink transition-colors duration-200 ease-premium hover:border-brand-500 hover:text-brand-500 lg:hidden"
            >
              <Menu className="h-5 w-5" strokeWidth={1.8} aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen ? (
        <div className="fixed inset-0 z-[70] lg:hidden">
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setMobileOpen(false)}
            className="absolute inset-0 h-full w-full cursor-default bg-black/70 backdrop-blur-sm"
          />
          <div className="absolute right-0 top-0 flex h-full w-[88%] max-w-sm flex-col border-l border-line bg-deep shadow-card">
            <div className="flex items-center justify-between border-b border-hairline px-5 py-4">
              <img src={site.logo} alt={site.logoAlt} className="h-9 w-auto" />
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
                className="flex h-9 w-9 items-center justify-center border border-line text-muted transition-colors duration-200 ease-premium hover:border-brand-500 hover:text-brand-500"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>

            <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-5 py-4">
              <ul>
                {navigation.map((item) => {
                  const active = isActive(item);
                  if (!item.children) {
                    return (
                      <li key={item.label} className="border-b border-hairline/60">
                        <Link
                          to={item.href}
                          className={`block py-3.5 text-[13px] font-semibold uppercase tracking-[0.14em] ${
                            active ? 'text-brand-500' : 'text-ink'
                          }`}
                        >
                          {item.label}
                        </Link>
                      </li>
                    );
                  }
                  const expanded = openSection === item.label;
                  return (
                    <li key={item.label} className="border-b border-hairline/60">
                      <div className="flex items-center justify-between">
                        <Link
                          to={item.href}
                          className={`py-3.5 text-[13px] font-semibold uppercase tracking-[0.14em] ${
                            active ? 'text-brand-500' : 'text-ink'
                          }`}
                        >
                          {item.label}
                        </Link>
                        <button
                          type="button"
                          aria-expanded={expanded}
                          aria-label={`${expanded ? 'Hide' : 'Show'} ${item.label} submenu`}
                          onClick={() => setOpenSection(expanded ? null : item.label)}
                          className="p-2 text-brand-500"
                        >
                          <ChevronDown
                            className={`h-4 w-4 transition-transform duration-300 ease-premium ${
                              expanded ? 'rotate-180' : ''
                            }`}
                            aria-hidden="true"
                          />
                        </button>
                      </div>
                      {expanded ? (
                        <ul className="border-l border-line pb-2 pl-4">
                          {item.children.map((child) => (
                            <li key={child.href}>
                              <Link to={child.href} className="block py-2.5 text-[12.5px] text-muted">
                                {child.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      ) : null}
                    </li>
                  );
                })}
              </ul>

              <div className="mt-6 space-y-3 border-t border-hairline pt-5 text-[12.5px] text-muted">
                <a href={site.phone.href} className="flex items-center gap-2.5">
                  <Phone className="h-4 w-4 text-brand-500" aria-hidden="true" />
                  {site.phone.label}
                </a>
                <a href={site.email.href} className="flex items-center gap-2.5">
                  <Mail className="h-4 w-4 text-brand-500" aria-hidden="true" />
                  {site.email.label}
                </a>
                <SocialLinks className="pt-1" />
              </div>
            </nav>
          </div>
        </div>
      ) : null}

      {/* Search */}
      {searchOpen ? (
        <div className="fixed inset-0 z-[75] flex items-start justify-center px-4 pt-24">
          <button
            type="button"
            aria-label="Close search"
            onClick={() => setSearchOpen(false)}
            className="absolute inset-0 h-full w-full cursor-default bg-black/75 backdrop-blur-sm"
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Search this website"
            className="relative w-full max-w-xl border border-line bg-deep shadow-card"
          >
            <form onSubmit={onSearchSubmit} className="flex items-center gap-3 border-b border-line px-4 py-3">
              <Search className="h-4 w-4 shrink-0 text-brand-500" aria-hidden="true" />
              <label htmlFor="site-search" className="sr-only">
                Search this website
              </label>
              <input
                id="site-search"
                ref={searchInputRef}
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search services, pages…"
                className="w-full bg-transparent py-1 text-[13.5px] text-ink outline-none placeholder:text-faint"
              />
              <button
                type="button"
                onClick={() => setSearchOpen(false)}
                aria-label="Close search"
                className="shrink-0 p-1 text-faint transition-colors duration-200 ease-premium hover:text-brand-500"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </form>

            <div className="max-h-80 overflow-y-auto">
              {query.trim() === '' ? (
                <p className="px-4 py-5 text-[12.5px] text-faint">
                  Start typing to search this website — try “bitumen”, “shipping” or “contact”.
                </p>
              ) : results.length === 0 ? (
                <p className="px-4 py-5 text-[12.5px] text-faint">
                  No pages match “{query}”. Try a shorter term, or contact us and we will point you in
                  the right direction.
                </p>
              ) : (
                <ul>
                  {results.map((result) => (
                    <li key={result.href}>
                      <button
                        type="button"
                        onClick={() => goTo(result.href)}
                        className="flex w-full items-start justify-between gap-4 border-b border-hairline/60 px-4 py-3 text-left transition-colors duration-200 ease-premium last:border-b-0 hover:bg-white/5"
                      >
                        <span>
                          <span className="block text-[13px] font-semibold text-ink">{result.title}</span>
                          <span className="mt-1 block text-[12px] text-faint">{result.description}</span>
                        </span>
                        <ArrowRight className="mt-1 h-3.5 w-3.5 shrink-0 text-brand-500" aria-hidden="true" />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}

import { useEffect, useState } from 'react';
import { Heart, Menu, Phone, X } from 'lucide-react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { navigation, site } from '../../data/site.js';
import useBodyScrollLock from '../../hooks/useBodyScrollLock.js';
import useScrollTrigger from '../../hooks/useScrollTrigger.js';
import { useFavorites } from '../../context/FavoritesContext.jsx';
import BrandMark from '../ui/BrandMark.jsx';
import Button from '../ui/Button.jsx';

function NavItem({ item, solid, onNavigate }) {
  return (
    <NavLink
      to={item.to}
      end={item.to === '/'}
      onClick={onNavigate}
      className={({ isActive }) =>
        [
          'group/nav relative py-2 font-display text-[12px] font-semibold uppercase tracking-[0.16em] transition-colors duration-300',
          solid
            ? isActive
              ? 'text-ink'
              : 'text-navy-500 hover:text-ink'
            : isActive
              ? 'text-white'
              : 'text-white/70 hover:text-white',
        ].join(' ')
      }
    >
      {({ isActive }) => (
        <>
          <span>{item.label}</span>
          <span
            aria-hidden="true"
            className={[
              'absolute -bottom-0.5 left-0 h-px bg-champagne-400 transition-all duration-300 ease-premium',
              isActive ? 'w-full' : 'w-0 group-hover/nav:w-full',
            ].join(' ')}
          />
        </>
      )}
    </NavLink>
  );
}

export default function Header() {
  const scrolled = useScrollTrigger(32);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const { count } = useFavorites();

  // Solid styling while scrolled or with the mobile panel open, so the logo and
  // close control always stay legible.
  const solid = scrolled || menuOpen;

  useBodyScrollLock(menuOpen);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!menuOpen) return undefined;
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [menuOpen]);

  return (
    <>
      <header
        className={[
          'fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-premium',
          solid
            ? 'border-b border-line/80 bg-white/95 shadow-header backdrop-blur-md'
            : 'border-b border-transparent bg-transparent',
        ].join(' ')}
      >
        <div className="shell">
          <div className="flex h-[68px] items-center justify-between gap-6 lg:h-[82px]">
            <Link
              to="/"
              aria-label={`${site.name} — home`}
              className="shrink-0 rounded-sm py-1 transition-opacity duration-300 hover:opacity-80"
            >
              <BrandMark tone={solid ? 'dark' : 'light'} />
            </Link>

            <nav aria-label="Main navigation" className="hidden items-center gap-8 lg:flex xl:gap-10">
              {navigation.map((item) => (
                <NavItem key={item.to} item={item} solid={solid} />
              ))}
            </nav>

            <div className="flex items-center gap-2 sm:gap-3">
              <Link
                to="/properties?saved=1"
                aria-label={`Saved properties (${count})`}
                title="Saved properties"
                className={[
                  'relative hidden h-10 w-10 items-center justify-center rounded-full border transition-all duration-300 ease-premium sm:inline-flex',
                  solid
                    ? 'border-line text-navy-600 hover:border-navy-900 hover:bg-navy-900 hover:text-white'
                    : 'border-white/30 text-white hover:border-white hover:bg-white/10',
                ].join(' ')}
              >
                <Heart aria-hidden="true" className="h-[17px] w-[17px]" strokeWidth={1.8} />
                {count > 0 ? (
                  <span className="absolute -right-1 -top-1 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-champagne-400 px-1 font-display text-[10px] font-bold text-ink">
                    {count}
                  </span>
                ) : null}
              </Link>

              <Button
                href={site.phoneHref}
                variant={solid ? 'outlineDark' : 'outlineLight'}
                size="sm"
                icon={Phone}
                iconPosition="left"
                className="hidden md:inline-flex"
              >
                {site.phone}
              </Button>

              <button
                type="button"
                onClick={() => setMenuOpen((open) => !open)}
                aria-expanded={menuOpen}
                aria-controls="mobile-navigation"
                aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                className={[
                  'inline-flex h-11 w-11 items-center justify-center rounded-full border transition-all duration-300 ease-premium lg:hidden',
                  solid
                    ? 'border-line text-ink hover:border-navy-900 hover:bg-navy-900 hover:text-white'
                    : 'border-white/30 text-white hover:border-white hover:bg-white/10',
                ].join(' ')}
              >
                {menuOpen ? (
                  <X aria-hidden="true" className="h-5 w-5" strokeWidth={1.8} />
                ) : (
                  <Menu aria-hidden="true" className="h-5 w-5" strokeWidth={1.8} />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/*
        The mobile panel is a sibling of <header>, not a child: the header uses
        backdrop-blur while scrolled or with the panel open, and a filtered
        ancestor becomes the containing block for `position: fixed` children —
        which would collapse the panel to the header's height.
      */}
      <div
        id="mobile-navigation"
        aria-hidden={!menuOpen}
        className={[
          'lg:hidden',
          menuOpen ? 'pointer-events-auto' : 'pointer-events-none',
        ].join(' ')}
      >
        <div
          className={[
            'fixed inset-x-0 bottom-0 top-[68px] z-40 overflow-y-auto bg-navy-950/95 backdrop-blur-md transition-all ease-premium',
            menuOpen ? 'translate-y-0 opacity-100' : '-translate-y-3 opacity-0',
          ].join(' ')}
          style={{ transitionDuration: '420ms' }}
        >
          <nav aria-label="Mobile navigation" className="shell py-8">
            <ul className="divide-y divide-white/10 border-y border-white/10">
              {navigation.map((item, index) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    end={item.to === '/'}
                    onClick={() => setMenuOpen(false)}
                    tabIndex={menuOpen ? 0 : -1}
                    style={{ transitionDelay: menuOpen ? `${60 + index * 45}ms` : '0ms' }}
                    className={({ isActive }) =>
                      [
                        'group flex items-center justify-between py-4 font-display text-[19px] font-semibold tracking-[-0.01em] transition-all duration-500 ease-premium',
                        isActive ? 'text-champagne-400' : 'text-white hover:text-champagne-300',
                        menuOpen ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0',
                      ].join(' ')
                    }
                  >
                    {item.label}
                    <span aria-hidden="true" className="text-white/25">
                      &rarr;
                    </span>
                  </NavLink>
                </li>
              ))}
            </ul>

            <div className="mt-8 grid gap-5 text-white">
              <a
                href={site.phoneHref}
                tabIndex={menuOpen ? 0 : -1}
                className="flex items-center gap-3 font-display text-[17px] font-semibold"
              >
                <Phone aria-hidden="true" className="h-4 w-4 text-champagne-400" strokeWidth={1.8} />
                {site.phone}
              </a>
              <a
                href={site.emailHref}
                tabIndex={menuOpen ? 0 : -1}
                className="text-[14px] text-navy-200 transition-colors hover:text-white"
              >
                {site.email}
              </a>
              <p className="text-[13px] leading-relaxed text-navy-300">
                {site.address.line1}
                <br />
                {site.address.line2}
              </p>
              <Button
                to="/properties"
                variant="gold"
                size="sm"
                tabIndex={menuOpen ? 0 : -1}
                onClick={() => setMenuOpen(false)}
                className="mt-1 w-full sm:w-auto"
              >
                Browse properties
              </Button>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
}

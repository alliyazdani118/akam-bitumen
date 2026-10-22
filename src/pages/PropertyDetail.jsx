import { useEffect, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronRight,
  Heart,
  Mail,
  MapPin,
  Phone,
  Plus,
  ShieldCheck,
} from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import PropertyGallery from '../components/property/PropertyGallery.jsx';
import PropertyCard from '../components/property/PropertyCard.jsx';
import PropertySpecs from '../components/property/PropertySpecs.jsx';
import Button from '../components/ui/Button.jsx';
import Reveal from '../components/ui/Reveal.jsx';
import ViewingDialog from '../components/contact/ViewingDialog.jsx';
import { useFavorites } from '../context/FavoritesContext.jsx';
import useScrollTrigger from '../hooks/useScrollTrigger.js';
import { getAgentById, getPropertyById, getSimilarProperties } from '../lib/api.js';
import { formatMillions, formatUsd } from '../lib/format.js';
import { portrait } from '../lib/images.js';
import NotFound from './NotFound.jsx';

const telHref = (phone) => `tel:${phone.replace(/[^\d+]/g, '')}`;

export default function PropertyDetail() {
  const { id } = useParams();
  const property = getPropertyById(id);
  const [viewingOpen, setViewingOpen] = useState(false);
  const scrolled = useScrollTrigger(520);
  const [nearBottom, setNearBottom] = useState(false);
  const { isFavorite, toggleFavorite } = useFavorites();

  useEffect(() => {
    const onScroll = () => {
      const remaining =
        document.documentElement.scrollHeight - window.scrollY - window.innerHeight;
      setNearBottom(remaining < 320);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!property) return undefined;
    const previous = document.title;
    document.title = `${property.title} — ${formatMillions(property.price)} | Horizon Properties`;
    return () => {
      document.title = previous;
    };
  }, [property]);

  if (!property) return <NotFound />;

  const agent = getAgentById(property.agentId);
  const similar = getSimilarProperties(property, 3);
  const saved = isFavorite(property.id);
  const showStickyCta = scrolled && !nearBottom;

  return (
    <>
      <PropertyGallery images={property.images} title={property.title}>
        <div className="shell pt-[96px] sm:pt-[112px]">
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-2 font-display text-[11px] font-semibold uppercase tracking-[0.2em] text-white/55">
              <li>
                <Link to="/" className="transition-colors hover:text-champagne-300">
                  Home
                </Link>
              </li>
              <li className="flex items-center gap-2">
                <ChevronRight aria-hidden="true" className="h-3.5 w-3.5 text-white/30" strokeWidth={2} />
                <Link to="/properties" className="transition-colors hover:text-champagne-300">
                  Properties
                </Link>
              </li>
              <li className="flex items-center gap-2">
                <ChevronRight aria-hidden="true" className="h-3.5 w-3.5 text-white/30" strokeWidth={2} />
                <span className="text-champagne-300" aria-current="page">
                  {property.title}
                </span>
              </li>
            </ol>
          </nav>

          <div className="mt-5 flex flex-wrap items-center gap-2.5">
            <span className="rounded-[2px] bg-white/10 px-2.5 py-1.5 font-display text-[10px] font-semibold uppercase tracking-[0.16em] text-white backdrop-blur-sm">
              {property.type}
            </span>
            <span className="rounded-[2px] bg-champagne-400 px-2.5 py-1.5 font-display text-[10px] font-semibold uppercase tracking-[0.16em] text-ink">
              {property.status}
            </span>
            {property.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-[2px] border border-white/25 px-2.5 py-1.5 font-display text-[10px] font-semibold uppercase tracking-[0.16em] text-white/85 backdrop-blur-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </PropertyGallery>

      <section className="section bg-paper" aria-labelledby="property-title">
        <div className="shell">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-8">
              <Reveal>
                <p className="eyebrow">{property.type} · {property.city}</p>
                <h1
                  id="property-title"
                  className="display-title mt-5"
                >
                  {property.title}
                </h1>
                <p className="mt-5 flex items-center gap-2 text-[15px] text-navy-500">
                  <MapPin aria-hidden="true" className="h-4 w-4 shrink-0 text-champagne-500" strokeWidth={1.8} />
                  {property.location}
                </p>
                <p className="body-lg mt-6 max-w-2xl">{property.tagline}</p>
              </Reveal>

              <Reveal delay={80} className="mt-9 border-y border-line py-7">
                <div className="flex flex-wrap items-center justify-between gap-6">
                  <div>
                    <p className="font-display text-[10.5px] font-semibold uppercase tracking-[0.2em] text-navy-400">
                      Guide price
                    </p>
                    <p className="mt-1.5 font-display text-[30px] font-extrabold tracking-[-0.02em] text-ink">
                      {formatMillions(property.price)}
                    </p>
                    <p className="mt-1 text-[13px] text-navy-400">{formatUsd(property.price)}</p>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => toggleFavorite(property.id)}
                      aria-pressed={saved}
                      className={`btn btn-sm ${saved ? 'btn-gold' : 'btn-outline-dark'}`}
                    >
                      <Heart
                        aria-hidden="true"
                        className="h-[15px] w-[15px]"
                        strokeWidth={1.9}
                        fill={saved ? 'currentColor' : 'none'}
                      />
                      {saved ? 'Saved' : 'Save property'}
                    </button>
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => setViewingOpen(true)}
                      className="max-sm:hidden"
                    >
                      Schedule a viewing
                    </Button>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={100} className="mt-12">
                <PropertySpecs property={property} variant="grid" />
              </Reveal>

              <Reveal delay={120} className="mt-14">
                <h2 className="font-display text-[22px] font-bold tracking-[-0.02em] text-ink">
                  About this property
                </h2>
                <div className="mt-5 space-y-5 text-[15.5px] leading-[1.8] text-navy-500">
                  {property.description.map((paragraph) => (
                    <p key={paragraph.slice(0, 24)}>{paragraph}</p>
                  ))}
                </div>
              </Reveal>

              <Reveal delay={140} className="mt-14">
                <h2 className="font-display text-[22px] font-bold tracking-[-0.02em] text-ink">
                  Key features
                </h2>
                <ul className="mt-6 grid gap-x-8 gap-y-4 sm:grid-cols-2">
                  {property.highlights.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-champagne-100 text-champagne-600">
                        <Check aria-hidden="true" className="h-3 w-3" strokeWidth={2.6} />
                      </span>
                      <span className="text-[14.5px] leading-relaxed text-navy-600">{item}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>

              <Reveal delay={160} className="mt-14">
                <h2 className="font-display text-[22px] font-bold tracking-[-0.02em] text-ink">
                  Amenities
                </h2>
                <ul className="mt-6 flex flex-wrap gap-2.5">
                  {property.amenities.map((item) => (
                    <li
                      key={item}
                      className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-3.5 py-2 text-[13px] text-navy-600"
                    >
                      <Plus aria-hidden="true" className="h-3 w-3 text-champagne-500" strokeWidth={2.4} />
                      {item}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>

            <aside className="lg:col-span-4">
              <div className="lg:sticky lg:top-28">
                <div className="rounded-card border border-line bg-white p-6 shadow-card sm:p-7">
                  <p className="font-display text-[10.5px] font-semibold uppercase tracking-[0.2em] text-navy-400">
                    Your advisor
                  </p>

                  {agent ? (
                    <>
                      <div className="mt-5 flex items-center gap-4">
                        <img
                          src={portrait(agent.photo, 200, 200)}
                          alt={`Portrait of ${agent.name}`}
                          width={64}
                          height={64}
                          loading="lazy"
                          decoding="async"
                          className="h-16 w-16 shrink-0 rounded-full object-cover"
                        />
                        <div>
                          <p className="font-display text-[16px] font-bold text-ink">{agent.name}</p>
                          <p className="mt-1 font-display text-[10.5px] font-semibold uppercase tracking-[0.18em] text-champagne-600">
                            {agent.role}
                          </p>
                        </div>
                      </div>

                      <dl className="mt-6 space-y-3.5 border-t border-line pt-5">
                        <div className="flex items-center gap-3">
                          <dt className="sr-only">Phone</dt>
                          <dd>
                            <a
                              href={telHref(agent.phone)}
                              className="flex items-center gap-2.5 text-[14px] text-navy-600 transition-colors hover:text-ink"
                            >
                              <Phone aria-hidden="true" className="h-4 w-4 text-champagne-500" strokeWidth={1.8} />
                              {agent.phone}
                            </a>
                          </dd>
                        </div>
                        <div className="flex items-center gap-3">
                          <dt className="sr-only">Email</dt>
                          <dd>
                            <a
                              href={`mailto:${agent.email}`}
                              className="flex items-center gap-2.5 break-all text-[14px] text-navy-600 transition-colors hover:text-ink"
                            >
                              <Mail aria-hidden="true" className="h-4 w-4 shrink-0 text-champagne-500" strokeWidth={1.8} />
                              {agent.email}
                            </a>
                          </dd>
                        </div>
                      </dl>
                    </>
                  ) : null}

                  <div className="mt-7 space-y-3">
                    <Button
                      variant="primary"
                      className="w-full"
                      onClick={() => setViewingOpen(true)}
                    >
                      Schedule a viewing
                    </Button>
                    <Button
                      variant="outlineDark"
                      className="w-full"
                      to={agent ? `/contact?advisor=${agent.id}` : '/contact'}
                    >
                      Contact agent
                    </Button>
                  </div>

                  <p className="mt-5 flex items-start gap-2 text-[12.5px] leading-relaxed text-navy-400">
                    <ShieldCheck
                      aria-hidden="true"
                      className="mt-0.5 h-4 w-4 shrink-0 text-champagne-500"
                      strokeWidth={1.7}
                    />
                    Verified listing. All viewings are accompanied by a Horizon advisor.
                  </p>
                </div>

                <Link
                  to="/properties"
                  className="group mt-5 inline-flex items-center gap-2 font-display text-[11px] font-semibold uppercase tracking-[0.18em] text-navy-500 transition-colors hover:text-ink"
                >
                  <ArrowLeft
                    aria-hidden="true"
                    className="h-3.5 w-3.5 transition-transform duration-300 ease-premium group-hover:-translate-x-1"
                    strokeWidth={2}
                  />
                  Back to all properties
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {similar.length ? (
        <section className="section bg-white" aria-labelledby="similar-title">
          <div className="shell">
            <Reveal className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="eyebrow">You may also like</p>
                <h2 id="similar-title" className="section-title mt-5">
                  Similar properties
                </h2>
              </div>
              <Button to="/properties" variant="outlineDark" icon={ArrowRight} className="shrink-0 self-start">
                View all
              </Button>
            </Reveal>

            <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {similar.map((item, index) => (
                <li key={item.id}>
                  <Reveal delay={index * 70} className="h-full">
                    <PropertyCard property={item} className="h-full" />
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      {/* Mobile action bar */}
      <div
        className={[
          'fixed inset-x-0 bottom-0 z-40 border-t border-line bg-white/95 backdrop-blur-md transition-transform duration-500 ease-premium lg:hidden',
          showStickyCta ? 'translate-y-0' : 'translate-y-full',
        ].join(' ')}
        style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
        aria-hidden={!showStickyCta}
      >
        <div className="shell flex items-center gap-3 py-3">
          <a
            href={agent ? telHref(agent.phone) : 'tel:+15552467890'}
            className="btn btn-outline-dark flex-1"
            tabIndex={showStickyCta ? 0 : -1}
          >
            <Phone aria-hidden="true" className="h-[15px] w-[15px]" strokeWidth={1.9} />
            Call
          </a>
          <button
            type="button"
            onClick={() => setViewingOpen(true)}
            className="btn btn-primary flex-[1.5]"
            tabIndex={showStickyCta ? 0 : -1}
          >
            Schedule a viewing
          </button>
        </div>
      </div>

      <ViewingDialog open={viewingOpen} onClose={() => setViewingOpen(false)} property={property} />
    </>
  );
}

import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import Icon from '../ui/Icon.jsx';

/**
 * Service card. The whole card is the link — the arrow square is decoration,
 * so there is no nested interactive element inside an anchor.
 */
export default function ServiceCard({ service, highlight = false }) {
  return (
    <Link
      to={`/services/${service.slug}`}
      className={`group relative flex h-full min-h-[152px] flex-col justify-between overflow-hidden border p-5 transition-all duration-300 ease-premium hover:border-brand-500 hover:bg-[#1C2429] ${
        highlight ? 'panel-accent border-brand-600/45' : 'border-line/70 bg-card'
      }`}
    >
      <span aria-hidden="true" className="absolute inset-x-0 top-0 h-[2px] bg-brand-500/70" />

      <div className="flex items-start justify-between gap-4">
        <Icon
          name={service.icon}
          className="h-7 w-7 text-brand-500 transition-colors duration-300 ease-premium group-hover:text-brand-300"
        />
        <span
          aria-hidden="true"
          className="flex h-8 w-8 items-center justify-center bg-brand-500 text-[#0B0F12] transition-transform duration-300 ease-premium group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
        >
          <ArrowUpRight className="h-4 w-4" strokeWidth={2.2} />
        </span>
      </div>

      <div className="mt-4">
        <h3 className="text-[17px] font-semibold leading-snug text-ink">{service.title}</h3>
        <p className="mt-2 text-[13px] leading-relaxed text-muted">{service.summary}</p>
      </div>
    </Link>
  );
}

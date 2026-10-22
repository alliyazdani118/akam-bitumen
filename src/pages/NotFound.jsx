import { ArrowRight, Mail, Phone, ShieldCheck, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button.jsx';

export default function NotFound() {
  return (
    <section className="relative isolate flex min-h-[100svh] items-center overflow-hidden bg-navy-950">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(90%_70%_at_50%_25%,rgba(28,52,76,0.85)_0%,rgba(7,21,38,0)_70%)]"
      />

      <div className="shell py-32 text-center">
        <p className="eyebrow eyebrow--center text-champagne-300">Error 404</p>
        <h1 className="mx-auto mt-6 max-w-3xl font-display text-[clamp(2rem,5.4vw,3.4rem)] font-extrabold leading-[1.1] tracking-[-0.03em] text-white">
          This address doesn&rsquo;t exist — the property may have been sold
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-[16px] leading-relaxed text-navy-200">
          The page you were looking for has moved or is no longer listed. Browse what is
          currently available, or let an advisor point you to something similar.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button to="/" variant="gold" icon={ArrowRight}>
            Back to home
          </Button>
          <Button to="/properties" variant="outlineLight">
            Browse properties
          </Button>
        </div>

        <div className="mt-16 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-[13px] text-navy-300">
          <a
            href="tel:+15552467890"
            className="flex items-center gap-2 transition-colors hover:text-white"
          >
            <Phone aria-hidden="true" className="h-4 w-4 text-champagne-400" strokeWidth={1.8} />
            (555) 246-7890
          </a>
          <a
            href="mailto:hello@horizonproperties.com"
            className="flex items-center gap-2 transition-colors hover:text-white"
          >
            <Mail aria-hidden="true" className="h-4 w-4 text-champagne-400" strokeWidth={1.8} />
            hello@horizonproperties.com
          </a>
          <Link to="/services" className="flex items-center gap-2 transition-colors hover:text-white">
            <Sparkles aria-hidden="true" className="h-4 w-4 text-champagne-400" strokeWidth={1.8} />
            Our services
          </Link>
          <span className="flex items-center gap-2 text-navy-400">
            <ShieldCheck aria-hidden="true" className="h-4 w-4 text-champagne-400" strokeWidth={1.8} />
            Licensed Texas brokerage
          </span>
        </div>
      </div>
    </section>
  );
}

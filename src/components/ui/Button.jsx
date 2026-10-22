import { Link } from 'react-router-dom';

const BASE =
  'inline-flex items-center justify-center gap-2 rounded-control px-5 py-3 text-[11px] font-bold uppercase tracking-[0.16em] transition-colors duration-200 ease-premium disabled:cursor-not-allowed disabled:opacity-60';

const VARIANTS = {
  primary: 'bg-brand-500 text-[#0B0F12] hover:bg-brand-400',
  outline: 'border border-line text-ink hover:border-brand-500 hover:text-brand-500',
};

/** Primary action control — renders as a router link, an anchor or a button. */
export default function Button({ variant = 'primary', to, href, className = '', children, ...rest }) {
  const classes = `${BASE} ${VARIANTS[variant] ?? VARIANTS.primary} ${className}`;

  if (to) {
    return (
      <Link to={to} className={classes} {...rest}>
        {children}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={classes} {...rest}>
        {children}
      </a>
    );
  }

  return (
    <button type="button" className={classes} {...rest}>
      {children}
    </button>
  );
}

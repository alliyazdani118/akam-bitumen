import { forwardRef } from 'react';
import { Link } from 'react-router-dom';

const VARIANTS = {
  primary: 'btn-primary',
  navy: 'btn-navy',
  gold: 'btn-gold',
  outlineLight: 'btn-outline-light',
  outlineDark: 'btn-outline-dark',
  quiet: 'btn-quiet',
};

/**
 * One button for the whole site: renders a router link, an anchor or a real
 * <button> depending on the props it is given, so nothing on the page is a
 * dead control.
 */
const Button = forwardRef(function Button(
  {
    to,
    href,
    variant = 'primary',
    size = 'md',
    icon: Icon,
    iconPosition = 'right',
    className = '',
    children,
    ...rest
  },
  ref,
) {
  const classes = [
    'btn',
    'group',
    VARIANTS[variant] ?? VARIANTS.primary,
    size === 'sm' ? 'btn-sm' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const content = (
    <>
      {Icon && iconPosition === 'left' ? (
        <Icon aria-hidden="true" className="h-[15px] w-[15px]" strokeWidth={1.8} />
      ) : null}
      <span>{children}</span>
      {Icon && iconPosition === 'right' ? (
        <Icon
          aria-hidden="true"
          className="h-[15px] w-[15px] transition-transform duration-300 ease-premium group-hover:translate-x-1"
          strokeWidth={1.8}
        />
      ) : null}
    </>
  );

  if (to) {
    return (
      <Link ref={ref} to={to} className={classes} {...rest}>
        {content}
      </Link>
    );
  }

  if (href) {
    return (
      <a ref={ref} href={href} className={classes} {...rest}>
        {content}
      </a>
    );
  }

  return (
    <button ref={ref} type="button" className={classes} {...rest}>
      {content}
    </button>
  );
});

export default Button;

/** Circular icon control — carousel arrows, gallery navigation, close buttons. */
export const IconButton = forwardRef(function IconButton(
  { label, icon: Icon, variant = 'light', className = '', children, ...rest },
  ref,
) {
  const variants = {
    light: 'border-white/30 bg-white/10 text-white hover:border-white hover:bg-white',
    lightSolid: 'border-line bg-white text-ink hover:border-navy-900 hover:bg-navy-900 hover:text-white',
    dark: 'border-navy-900/15 bg-white text-ink hover:border-navy-900 hover:bg-navy-900 hover:text-white',
    navy: 'border-navy-800 bg-navy-900 text-white hover:bg-navy-700',
    champagne: 'border-transparent bg-champagne-400 text-ink hover:bg-champagne-300',
  };

  return (
    <button
      ref={ref}
      type="button"
      aria-label={label}
      className={`icon-btn ${variants[variant] ?? variants.light} ${className}`.trim()}
      {...rest}
    >
      {Icon ? <Icon aria-hidden="true" className="h-[18px] w-[18px]" strokeWidth={1.7} /> : children}
    </button>
  );
});

/**
 * Shared section header: champagne eyebrow, display title, supporting copy.
 * `tone` switches the palette for use on dark photographic sections.
 */
export default function SectionHeading({
  eyebrow,
  title,
  copy,
  align = 'left',
  tone = 'dark',
  titleClassName = '',
  copyClassName = '',
  className = '',
  children,
}) {
  const centered = align === 'center';
  const titleColor = tone === 'light' ? 'text-white' : 'text-ink';
  const copyColor = tone === 'light' ? 'text-navy-200' : 'text-navy-500';

  return (
    <div
      className={[
        centered ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {eyebrow ? (
        <p className={`eyebrow ${centered ? 'eyebrow--center' : ''}`}>{eyebrow}</p>
      ) : null}

      {title ? (
        <h2
          className={`section-title mt-5 ${titleColor} ${titleClassName}`.trim()}
        >
          {title}
        </h2>
      ) : null}

      {copy ? (
        <p className={`body-lg mt-5 ${copyColor} ${copyClassName}`.trim()}>{copy}</p>
      ) : null}

      {children}
    </div>
  );
}

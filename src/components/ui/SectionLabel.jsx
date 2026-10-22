/** Small orange label used above section headings. */
export default function SectionLabel({ children, withLine = false, className = '' }) {
  return (
    <p className={`flex items-center gap-3 ${className}`}>
      {withLine ? <span aria-hidden="true" className="h-[2px] w-8 shrink-0 bg-brand-500" /> : null}
      <span className="eyebrow">{children}</span>
    </p>
  );
}

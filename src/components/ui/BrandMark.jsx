/**
 * The Horizon mark: a minimal architectural glyph (two piers beneath a horizon
 * line) drawn in champagne, paired with the wordmark.
 */
export default function BrandMark({ tone = 'light', className = '', compact = false }) {
  const wordColor = tone === 'light' ? 'text-white' : 'text-ink';
  const subColor = tone === 'light' ? 'text-white/55' : 'text-navy-400';

  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`.trim()}>
      <svg
        viewBox="0 0 32 32"
        aria-hidden="true"
        className="h-[26px] w-[26px] shrink-0"
        fill="none"
      >
        <path
          d="M7 22.5V9.5M25 22.5V9.5M7 16h18"
          stroke="#CBAA7C"
          strokeWidth="1.6"
          strokeLinecap="square"
        />
        <path d="M3.5 26h25" stroke="#CBAA7C" strokeWidth="1.6" strokeLinecap="square" />
      </svg>
      <span className="flex flex-col justify-center leading-none">
        <span
          className={`font-display text-[16px] font-extrabold uppercase tracking-[0.06em] ${wordColor}`}
        >
          Horizon
        </span>
        {!compact ? (
          <span
            className={`mt-[3px] font-display text-[8.5px] font-semibold uppercase leading-none tracking-[0.44em] ${subColor}`}
          >
            Properties
          </span>
        ) : null}
      </span>
    </span>
  );
}

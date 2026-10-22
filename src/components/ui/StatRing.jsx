import { useEffect, useRef, useState } from 'react';

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

/**
 * Circular percentage indicator used in the stats band — the ring fills and
 * the number counts up once the figure scrolls into view.
 */
export default function StatRing({ value, label, size = 128, stroke = 4, tone = 'light' }) {
  const ref = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    if (typeof IntersectionObserver === 'undefined' || prefersReducedMotion()) {
      setProgress(value);
      return undefined;
    }

    let frame = 0;
    const animate = () => {
      const start = performance.now();
      const duration = 1400;
      const tick = (now) => {
        const t = Math.min((now - start) / duration, 1);
        const eased = 1 - (1 - t) ** 3;
        setProgress(value * eased);
        if (t < 1) frame = window.requestAnimationFrame(tick);
      };
      frame = window.requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animate();
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.4 },
    );

    observer.observe(node);
    return () => {
      observer.disconnect();
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [value]);

  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference * (1 - progress / 100);
  const trackColor = tone === 'light' ? 'rgba(255,255,255,0.16)' : 'rgba(10,26,42,0.12)';
  const textColor = tone === 'light' ? 'text-white' : 'text-ink';
  const labelColor = tone === 'light' ? 'text-navy-200' : 'text-navy-500';

  return (
    <div ref={ref} className="flex flex-col items-center text-center">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90" aria-hidden="true">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={trackColor}
            strokeWidth={stroke}
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="#CBAA7C"
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={dashOffset}
          />
        </svg>
        <span
          className={`absolute inset-0 flex items-center justify-center font-display text-[26px] font-bold tracking-tight ${textColor}`}
        >
          {Math.round(progress)}
          <span className="ml-0.5 text-[14px] font-semibold">%</span>
        </span>
      </div>
      <p
        className={`mt-5 max-w-[9.5rem] font-display text-[11px] font-semibold uppercase tracking-[0.2em] ${labelColor}`}
      >
        {label}
      </p>
    </div>
  );
}

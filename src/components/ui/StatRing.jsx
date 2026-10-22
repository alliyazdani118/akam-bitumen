import { useEffect, useRef, useState } from 'react';

function prefersReducedMotion() {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
}

/**
 * Circular statistic: an orange progress ring around a counting percentage,
 * with the label and description beside it. Counts up once, when the section
 * scrolls into view.
 */
export default function StatRing({ value, label, description, size = 66 }) {
  const containerRef = useRef(null);
  const [shown, setShown] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return undefined;
    if (prefersReducedMotion() || typeof IntersectionObserver === 'undefined') {
      setShown(true);
      return undefined;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setShown(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!shown) return undefined;
    if (prefersReducedMotion()) {
      setProgress(value);
      return undefined;
    }
    let frame = 0;
    const duration = 1100;
    const start = performance.now();
    const step = (now) => {
      const elapsed = Math.min(1, (now - start) / duration);
      const eased = 1 - (1 - elapsed) ** 3;
      setProgress(Math.round(value * eased));
      if (elapsed < 1) frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [shown, value]);

  const stroke = 2;
  const radius = (size - stroke * 2) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - progress / 100);

  return (
    <div ref={containerRef} className="flex items-center gap-4">
      <span className="sr-only">
        {value} percent — {label}: {description}
      </span>
      <div className="relative shrink-0" style={{ width: size, height: size }} aria-hidden="true">
        <svg viewBox={`0 0 ${size} ${size}`} className="h-full w-full -rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="rgba(255,255,255,0.12)"
            strokeWidth={stroke}
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="#FF8A00"
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
          />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center text-[15px] font-bold text-ink">
          {progress}%
        </span>
      </div>
      <div aria-hidden="true">
        <p className="text-[14px] font-semibold text-ink">{label}</p>
        <p className="mt-1 text-[12.5px] leading-relaxed text-faint">{description}</p>
      </div>
    </div>
  );
}

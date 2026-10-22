import { useEffect, useState } from 'react';

/** True once the page has scrolled past `threshold` pixels. */
export default function useScrollTrigger(threshold = 24) {
  const [triggered, setTriggered] = useState(
    () => typeof window !== 'undefined' && window.scrollY > threshold,
  );

  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        setTriggered(window.scrollY > threshold);
      });
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [threshold]);

  return triggered;
}

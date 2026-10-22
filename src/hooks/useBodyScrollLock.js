import { useEffect } from 'react';

/**
 * Locks page scrolling while an overlay (mobile menu, search, dialog) is open,
 * restoring the previous value when it closes.
 */
export default function useBodyScrollLock(locked) {
  useEffect(() => {
    if (!locked) return undefined;
    const { body } = document;
    const previous = body.style.overflow;
    body.style.overflow = 'hidden';
    return () => {
      body.style.overflow = previous;
    };
  }, [locked]);
}

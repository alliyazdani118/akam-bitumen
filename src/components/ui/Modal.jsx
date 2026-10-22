import { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import useBodyScrollLock from '../../hooks/useBodyScrollLock.js';

/** Accessible modal: backdrop click and Escape close, focus lands inside. */
export default function Modal({ open, onClose, title, description, children }) {
  const closeRef = useRef(null);
  const panelRef = useRef(null);

  useBodyScrollLock(open);

  useEffect(() => {
    if (!open) return undefined;

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();
        return;
      }
      // Keep focus inside the dialog while it is open.
      if (event.key === 'Tab' && panelRef.current) {
        const focusable = panelRef.current.querySelectorAll(
          'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])',
        );
        if (!focusable.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener('keydown', onKeyDown);
    closeRef.current?.focus();

    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-end justify-center overflow-y-auto p-0 sm:items-center sm:p-6">
      <button
        type="button"
        aria-label="Close dialog"
        onClick={onClose}
        className="fixed inset-0 cursor-default bg-navy-950/70 backdrop-blur-sm"
      />

      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className="relative z-10 max-h-[92vh] w-full max-w-xl animate-fade-up overflow-y-auto rounded-t-card bg-white p-6 shadow-lift sm:rounded-card sm:p-8"
      >
        <div className="flex items-start justify-between gap-6">
          <div>
            <h2 className="font-display text-[22px] font-bold tracking-[-0.01em] text-ink">{title}</h2>
            {description ? (
              <p className="mt-2.5 text-[14px] leading-relaxed text-navy-500">{description}</p>
            ) : null}
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="icon-btn -mr-1 -mt-1 h-10 w-10 shrink-0 border-line text-navy-500 hover:border-navy-900 hover:bg-navy-900 hover:text-white"
          >
            <X aria-hidden="true" className="h-[17px] w-[17px]" strokeWidth={1.8} />
          </button>
        </div>

        <div className="mt-7">{children}</div>
      </div>
    </div>
  );
}

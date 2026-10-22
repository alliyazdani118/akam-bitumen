import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Minus, Plus } from 'lucide-react';

/**
 * Accessible FAQ accordion. An anchored item (e.g. /faq#shipping-information)
 * opens automatically so the link lands on a visible answer.
 */
export default function FaqAccordion({ items }) {
  const { hash } = useLocation();
  const [openId, setOpenId] = useState(null);

  useEffect(() => {
    const id = hash ? decodeURIComponent(hash.slice(1)) : '';
    if (id && items.some((item) => item.id === id)) setOpenId(id);
  }, [hash, items]);

  return (
    <div className="space-y-3">
      {items.map((item) => {
        const open = openId === item.id;
        return (
          <section key={item.id} id={item.id} className="scroll-mt-36 border border-line/70 bg-card">
            <h2 className="text-[15px] font-semibold">
              <button
                type="button"
                onClick={() => setOpenId(open ? null : item.id)}
                aria-expanded={open}
                aria-controls={`${item.id}-panel`}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-ink transition-colors duration-200 ease-premium hover:text-brand-500"
              >
                {item.question}
                <span
                  aria-hidden="true"
                  className="flex h-7 w-7 shrink-0 items-center justify-center border border-line text-brand-500"
                >
                  {open ? <Minus className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
                </span>
              </button>
            </h2>
            <div
              id={`${item.id}-panel`}
              role="region"
              aria-labelledby={item.id}
              className={`grid motion-safe:transition-all motion-safe:duration-300 motion-safe:ease-premium ${
                open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
              }`}
            >
              <div className="overflow-hidden">
                <p className="px-5 pb-5 text-[13px] leading-relaxed text-muted">{item.answer}</p>
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
}

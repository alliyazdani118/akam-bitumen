import { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { subscribeToNewsletter } from '../../lib/inquiries.js';

/** Footer newsletter signup — a working form with inline success feedback. */
export default function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (status === 'submitting') return;
    setStatus('submitting');
    try {
      await subscribeToNewsletter(email.trim());
      setStatus('done');
      setEmail('');
    } catch {
      setStatus('error');
    }
  };

  if (status === 'done') {
    return (
      <div
        role="status"
        className="flex items-center gap-3 rounded-control border border-champagne-400/40 bg-white/5 px-4 py-3.5 text-[13.5px] text-white"
      >
        <Check aria-hidden="true" className="h-4 w-4 shrink-0 text-champagne-400" strokeWidth={2} />
        You&rsquo;re on the list. New listings will reach you first.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-2.5">
      <label htmlFor="newsletter-email" className="sr-only">
        Email address
      </label>
      <div className="flex overflow-hidden rounded-control border border-white/20 bg-white/5 focus-within:border-champagne-400">
        <input
          id="newsletter-email"
          type="email"
          name="email"
          required
          autoComplete="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Email address"
          className="min-w-0 flex-1 bg-transparent px-4 py-3 text-[13.5px] text-white placeholder:text-navy-300 focus:outline-none"
        />
        <button
          type="submit"
          disabled={status === 'submitting'}
          className="inline-flex shrink-0 items-center gap-2 bg-champagne-400 px-5 font-display text-[11px] font-semibold uppercase tracking-[0.16em] text-ink transition-colors duration-300 hover:bg-champagne-300 disabled:opacity-60"
        >
          {status === 'submitting' ? 'Sending' : 'Sign up'}
          <ArrowRight aria-hidden="true" className="h-3.5 w-3.5" strokeWidth={2} />
        </button>
      </div>
      {status === 'error' ? (
        <p role="alert" className="text-[12.5px] text-champagne-300">
          Something went wrong — please try again.
        </p>
      ) : (
        <p className="text-[12.5px] text-navy-300">
          Market notes and new listings. No more than once a month.
        </p>
      )}
    </form>
  );
}

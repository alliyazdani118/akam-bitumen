import { useId, useState } from 'react';
import { CircleAlert, CircleCheck, LoaderCircle } from 'lucide-react';
import { subscribeToNewsletter } from '../../lib/api.js';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * Newsletter signup. Success is only shown once the API has confirmed that the
 * subscription was stored — a failed request shows an error instead.
 */
export default function NewsletterForm({ className = '' }) {
  const inputId = useId();
  const messageId = `${inputId}-message`;
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const value = email.trim();

    if (value === '') {
      setStatus('error');
      setMessage('Please enter your email address.');
      return;
    }
    if (!EMAIL_PATTERN.test(value)) {
      setStatus('error');
      setMessage('Please enter a valid email address, for example name@company.com.');
      return;
    }

    setStatus('loading');
    setMessage('');
    try {
      await subscribeToNewsletter(value);
      setStatus('success');
      setMessage('Thank you — your subscription has been saved and a confirmation will follow.');
      setEmail('');
    } catch (error) {
      setStatus('error');
      setMessage(
        error?.message || 'We could not save your subscription right now. Please try again.',
      );
    }
  };

  const busy = status === 'loading';

  return (
    <form onSubmit={handleSubmit} className={className} noValidate>
      <div className="flex flex-col gap-2.5 sm:flex-row">
        <label htmlFor={inputId} className="sr-only">
          Email address
        </label>
        <input
          id={inputId}
          type="email"
          name="email"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
            if (status !== 'idle' && status !== 'loading') {
              setStatus('idle');
              setMessage('');
            }
          }}
          placeholder="Enter your email"
          autoComplete="email"
          aria-describedby={message ? messageId : undefined}
          aria-invalid={status === 'error' ? 'true' : undefined}
          className="w-full rounded-control border border-line bg-black/40 px-4 py-3 text-[13px] text-ink placeholder:text-faint focus:border-brand-500 focus:outline-none"
        />
        <button
          type="submit"
          disabled={busy}
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-control bg-brand-500 px-6 py-3 text-[11px] font-bold uppercase tracking-[0.16em] text-[#0B0F12] transition-colors duration-200 ease-premium hover:bg-brand-400 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {busy ? <LoaderCircle className="h-3.5 w-3.5 animate-spin" aria-hidden="true" /> : null}
          {busy ? 'Sending' : 'Sign up'}
        </button>
      </div>

      {message ? (
        <p
          id={messageId}
          role={status === 'error' ? 'alert' : 'status'}
          className={`mt-3 flex items-start gap-2 text-[12.5px] ${
            status === 'error' ? 'text-[#FFB4A2]' : 'text-brand-300'
          }`}
        >
          {status === 'error' ? (
            <CircleAlert className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          ) : (
            <CircleCheck className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          )}
          {message}
        </p>
      ) : null}
    </form>
  );
}

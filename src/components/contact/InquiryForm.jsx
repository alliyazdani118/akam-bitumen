import { useId, useState } from 'react';
import { CircleAlert, CircleCheck, LoaderCircle, Send } from 'lucide-react';
import { submitInquiry } from '../../lib/api.js';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const FIELD_CLASS =
  'w-full rounded-control border border-line bg-black/30 px-4 py-3 text-[13px] text-ink placeholder:text-faint focus:border-brand-500 focus:outline-none';

/** Contact / quote request form. Stores the enquiry through the site API. */
export default function InquiryForm() {
  const formId = useId();
  const [values, setValues] = useState({ name: '', email: '', phone: '', company: '', message: '' });
  const [status, setStatus] = useState('idle');
  const [message, setMessage] = useState('');

  const update = (field) => (event) => {
    const { value } = event.target;
    setValues((current) => ({ ...current, [field]: value }));
    if (status === 'error' || status === 'success') {
      setStatus('idle');
      setMessage('');
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const name = values.name.trim();
    const email = values.email.trim();
    const enquiry = values.message.trim();

    if (!name || !email || !enquiry) {
      setStatus('error');
      setMessage('Please add your name, email address and a short message.');
      return;
    }
    if (!EMAIL_PATTERN.test(email)) {
      setStatus('error');
      setMessage('Please enter a valid email address, for example name@company.com.');
      return;
    }

    setStatus('loading');
    setMessage('');
    try {
      await submitInquiry({
        name,
        email,
        phone: values.phone.trim(),
        company: values.company.trim(),
        message: enquiry,
      });
      setStatus('success');
      setMessage('Thank you — your enquiry has been saved. We will reply using the email address you provided.');
      setValues({ name: '', email: '', phone: '', company: '', message: '' });
    } catch (error) {
      setStatus('error');
      setMessage(error?.message || 'We could not send your enquiry right now. Please try again.');
    }
  };

  const busy = status === 'loading';

  return (
    <form onSubmit={handleSubmit} className="panel p-6 lg:p-7" noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor={`${formId}-name`} className="mb-2 block text-[12px] font-semibold text-ink">
            Name <span className="text-brand-500">*</span>
          </label>
          <input
            id={`${formId}-name`}
            name="name"
            value={values.name}
            onChange={update('name')}
            autoComplete="name"
            placeholder="Your full name"
            className={FIELD_CLASS}
          />
        </div>
        <div>
          <label htmlFor={`${formId}-email`} className="mb-2 block text-[12px] font-semibold text-ink">
            Email <span className="text-brand-500">*</span>
          </label>
          <input
            id={`${formId}-email`}
            name="email"
            type="email"
            value={values.email}
            onChange={update('email')}
            autoComplete="email"
            placeholder="name@company.com"
            className={FIELD_CLASS}
          />
        </div>
        <div>
          <label htmlFor={`${formId}-company`} className="mb-2 block text-[12px] font-semibold text-ink">
            Company
          </label>
          <input
            id={`${formId}-company`}
            name="company"
            value={values.company}
            onChange={update('company')}
            autoComplete="organization"
            placeholder="Company name"
            className={FIELD_CLASS}
          />
        </div>
        <div>
          <label htmlFor={`${formId}-phone`} className="mb-2 block text-[12px] font-semibold text-ink">
            Phone
          </label>
          <input
            id={`${formId}-phone`}
            name="phone"
            value={values.phone}
            onChange={update('phone')}
            autoComplete="tel"
            placeholder="Optional"
            className={FIELD_CLASS}
          />
        </div>
      </div>

      <div className="mt-4">
        <label htmlFor={`${formId}-message`} className="mb-2 block text-[12px] font-semibold text-ink">
          Message <span className="text-brand-500">*</span>
        </label>
        <textarea
          id={`${formId}-message`}
          name="message"
          rows="5"
          value={values.message}
          onChange={update('message')}
          placeholder="Grade or specification, volume, delivery point and timing — whatever you already know."
          className={`${FIELD_CLASS} resize-y`}
        />
      </div>

      <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[11.5px] leading-relaxed text-faint">
          Fields marked * are required. Your details are stored only to answer this enquiry.
        </p>
        <button
          type="submit"
          disabled={busy}
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-control bg-brand-500 px-6 py-3 text-[11px] font-bold uppercase tracking-[0.16em] text-[#0B0F12] transition-colors duration-200 ease-premium hover:bg-brand-400 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {busy ? (
            <LoaderCircle className="h-3.5 w-3.5 animate-spin" aria-hidden="true" />
          ) : (
            <Send className="h-3.5 w-3.5" aria-hidden="true" />
          )}
          {busy ? 'Sending' : 'Send enquiry'}
        </button>
      </div>

      {message ? (
        <p
          role={status === 'error' ? 'alert' : 'status'}
          className={`mt-4 flex items-start gap-2 text-[12.5px] ${
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

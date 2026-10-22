import { useState } from 'react';
import { ArrowRight, Check, Loader2 } from 'lucide-react';
import { contactSubjects } from '../../data/site.js';
import { submitInquiry } from '../../lib/inquiries.js';

const EMPTY = { name: '', email: '', phone: '', subject: '', message: '' };

/**
 * One inquiry form for the contact page, the agent panels and the viewing
 * dialog. Submissions go through `submitInquiry`, the seam where a CRM or API
 * would be connected.
 */
export default function InquiryForm({
  defaultSubject = contactSubjects[0],
  propertyId,
  propertyTitle,
  messagePlaceholder,
  submitLabel = 'Send enquiry',
  onSubmitted,
}) {
  const [values, setValues] = useState({ ...EMPTY, subject: defaultSubject });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle');

  const setField = (field) => (event) => {
    const { value } = event.target;
    setValues((current) => ({ ...current, [field]: value }));
    if (errors[field]) setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const validate = () => {
    const next = {};
    if (!values.name.trim()) next.name = 'Please tell us your name.';
    if (!values.email.trim()) next.email = 'An email address is required.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim()))
      next.email = 'That email address looks incomplete.';
    if (!values.message.trim()) next.message = 'Add a short message so we can help.';
    return next;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      setStatus('invalid');
      return;
    }

    setStatus('submitting');
    try {
      await submitInquiry({
        ...values,
        name: values.name.trim(),
        email: values.email.trim(),
        phone: values.phone.trim(),
        message: values.message.trim(),
        propertyId: propertyId ?? null,
        propertyTitle: propertyTitle ?? null,
      });
      setStatus('done');
      setValues({ ...EMPTY, subject: defaultSubject });
      onSubmitted?.();
    } catch {
      setStatus('error');
    }
  };

  if (status === 'done') {
    return (
      <div
        role="status"
        className="flex flex-col items-start gap-4 rounded-card border border-champagne-200 bg-champagne-50 p-6 text-left"
      >
        <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-champagne-400 text-ink">
          <Check aria-hidden="true" className="h-5 w-5" strokeWidth={2} />
        </span>
        <div>
          <p className="font-display text-[17px] font-bold text-ink">Thank you — message received.</p>
          <p className="mt-2 text-[14px] leading-relaxed text-navy-500">
            One of our advisors will reply within one business day
            {propertyTitle ? ` about ${propertyTitle}` : ''}.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setStatus('idle')}
          className="font-display text-[11px] font-semibold uppercase tracking-[0.18em] text-navy-500 underline decoration-champagne-400 decoration-2 underline-offset-4 transition-colors hover:text-ink"
        >
          Send another message
        </button>
      </div>
    );
  }

  const invalid = (field) => (errors[field] ? 'border-red-400 focus:border-red-400' : '');

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="inquiry-name" className="field-label">
            Full name<span className="text-champagne-500"> *</span>
          </label>
          <input
            id="inquiry-name"
            name="name"
            autoComplete="name"
            value={values.name}
            onChange={setField('name')}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? 'inquiry-name-error' : undefined}
            className={`field ${invalid('name')}`}
          />
          {errors.name ? (
            <p id="inquiry-name-error" role="alert" className="mt-1.5 text-[12px] text-red-500">
              {errors.name}
            </p>
          ) : null}
        </div>

        <div>
          <label htmlFor="inquiry-email" className="field-label">
            Email<span className="text-champagne-500"> *</span>
          </label>
          <input
            id="inquiry-email"
            name="email"
            type="email"
            autoComplete="email"
            value={values.email}
            onChange={setField('email')}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? 'inquiry-email-error' : undefined}
            className={`field ${invalid('email')}`}
          />
          {errors.email ? (
            <p id="inquiry-email-error" role="alert" className="mt-1.5 text-[12px] text-red-500">
              {errors.email}
            </p>
          ) : null}
        </div>

        <div>
          <label htmlFor="inquiry-phone" className="field-label">
            Phone <span className="normal-case tracking-normal text-navy-300">(optional)</span>
          </label>
          <input
            id="inquiry-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            value={values.phone}
            onChange={setField('phone')}
            className="field"
          />
        </div>

        <div>
          <label htmlFor="inquiry-subject" className="field-label">
            Enquiry type
          </label>
          <select
            id="inquiry-subject"
            name="subject"
            value={values.subject}
            onChange={setField('subject')}
            className="field cursor-pointer"
          >
            {contactSubjects.map((subject) => (
              <option key={subject} value={subject}>
                {subject}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="inquiry-message" className="field-label">
          Message<span className="text-champagne-500"> *</span>
        </label>
        <textarea
          id="inquiry-message"
          name="message"
          rows={4}
          value={values.message}
          onChange={setField('message')}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? 'inquiry-message-error' : undefined}
          placeholder={
            messagePlaceholder ??
            (propertyTitle
              ? `I'd like to arrange a viewing of ${propertyTitle}.`
              : 'Tell us what you are looking for.')
          }
          className={`field resize-y ${invalid('message')}`}
        />
        {errors.message ? (
          <p id="inquiry-message-error" role="alert" className="mt-1.5 text-[12px] text-red-500">
            {errors.message}
          </p>
        ) : null}
      </div>

      <div className="flex flex-wrap items-center gap-5">
        <button type="submit" disabled={status === 'submitting'} className="btn btn-primary group">
          {status === 'submitting' ? (
            <>
              <Loader2 aria-hidden="true" className="h-4 w-4 animate-spin" strokeWidth={2} />
              Sending
            </>
          ) : (
            <>
              {submitLabel}
              <ArrowRight
                aria-hidden="true"
                className="h-[15px] w-[15px] transition-transform duration-300 ease-premium group-hover:translate-x-1"
                strokeWidth={1.8}
              />
            </>
          )}
        </button>
        <p className="text-[12.5px] text-navy-400">
          We reply within one business day. Your details are never shared.
        </p>
      </div>

      <p aria-live="polite" className="sr-only">
        {status === 'invalid' ? 'Please correct the highlighted fields.' : ''}
        {status === 'error' ? 'Something went wrong. Please try again.' : ''}
      </p>
      {status === 'error' ? (
        <p role="alert" className="text-[12.5px] text-red-500">
          Something went wrong sending your message. Please try again.
        </p>
      ) : null}
    </form>
  );
}

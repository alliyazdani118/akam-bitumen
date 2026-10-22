/**
 * Client for the small JSON API in `server/`.
 *
 * The dev server proxies `/api` to the API service, so requests are
 * same-origin and no base URL has to be baked into the bundle. Set
 * VITE_API_BASE_URL to point the site at a different host.
 */

const API_BASE = import.meta.env.VITE_API_BASE_URL || '/api';

export class ApiError extends Error {}

async function post(path, payload) {
  let response;
  try {
    response = await fetch(`${API_BASE}${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
  } catch {
    throw new ApiError('We could not reach the server. Please check your connection and try again.');
  }

  let data = null;
  try {
    data = await response.json();
  } catch {
    data = null;
  }

  if (!response.ok) {
    throw new ApiError(
      data?.error || 'The server could not process this request. Please try again shortly.',
    );
  }

  return data;
}

/** Stores a newsletter subscription. Resolves with the stored record. */
export function subscribeToNewsletter(email) {
  return post('/newsletter', { email });
}

/** Stores a contact enquiry. Resolves with the stored record. */
export function submitInquiry(payload) {
  return post('/inquiries', payload);
}

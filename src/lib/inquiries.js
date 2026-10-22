import { STORAGE_KEYS, readStored, writeStored } from './storage.js';

/**
 * Inquiry and newsletter handling.
 *
 * Records are kept locally for now; these functions are the seam where a real
 * backend (CRM, mail provider, database) plugs in — the components only ever
 * await them and show a success or error state.
 */

function createId(prefix) {
  return `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}

export async function submitInquiry(payload) {
  const record = {
    id: createId('inq'),
    createdAt: new Date().toISOString(),
    ...payload,
  };
  const existing = readStored(STORAGE_KEYS.inquiries, []);
  writeStored(STORAGE_KEYS.inquiries, [record, ...(Array.isArray(existing) ? existing : [])]);
  return record;
}

export function listInquiries() {
  return readStored(STORAGE_KEYS.inquiries, []);
}

export async function subscribeToNewsletter(email) {
  const existing = readStored(STORAGE_KEYS.newsletter, []);
  const list = Array.isArray(existing) ? existing : [];
  if (!list.some((entry) => entry.email === email)) {
    writeStored(STORAGE_KEYS.newsletter, [
      { email, subscribedAt: new Date().toISOString() },
      ...list,
    ]);
  }
  return { email };
}

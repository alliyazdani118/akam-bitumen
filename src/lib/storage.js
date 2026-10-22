/** Small, defensive wrappers around the Web Storage API. */

const memory = new Map();

function storage() {
  try {
    return typeof window === 'undefined' ? null : window.localStorage;
  } catch {
    return null;
  }
}

export function readStored(key, fallback) {
  const store = storage();
  if (!store) return memory.has(key) ? memory.get(key) : fallback;
  try {
    const raw = store.getItem(key);
    return raw === null ? fallback : JSON.parse(raw);
  } catch {
    return fallback;
  }
}

export function writeStored(key, value) {
  const store = storage();
  if (!store) {
    memory.set(key, value);
    return;
  }
  try {
    store.setItem(key, JSON.stringify(value));
  } catch {
    memory.set(key, value);
  }
}

export const STORAGE_KEYS = {
  favorites: 'horizon:favorites',
  inquiries: 'horizon:inquiries',
  newsletter: 'horizon:newsletter',
};

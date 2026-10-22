import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { STORAGE_KEYS, readStored, writeStored } from '../lib/storage.js';

const FavoritesContext = createContext(null);

/**
 * Saved properties, shared across the whole app so the homepage carousel, the
 * browse grid and the detail page all reflect the same state. Persisted to
 * localStorage; swapping in an account-backed list means changing this file.
 */
export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState(() => {
    const stored = readStored(STORAGE_KEYS.favorites, []);
    return Array.isArray(stored) ? stored : [];
  });

  useEffect(() => {
    writeStored(STORAGE_KEYS.favorites, favorites);
  }, [favorites]);

  const toggleFavorite = useCallback((id) => {
    setFavorites((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    );
  }, []);

  const clearFavorites = useCallback(() => setFavorites([]), []);

  const value = useMemo(
    () => ({
      favorites,
      count: favorites.length,
      isFavorite: (id) => favorites.includes(id),
      toggleFavorite,
      clearFavorites,
    }),
    [favorites, toggleFavorite, clearFavorites],
  );

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) throw new Error('useFavorites must be used inside a FavoritesProvider');
  return context;
}

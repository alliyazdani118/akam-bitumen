import { Heart } from 'lucide-react';
import { useFavorites } from '../../context/FavoritesContext.jsx';

/**
 * Save / unsave a property. State lives in FavoritesContext so every card and
 * the detail page stay in sync.
 */
export default function FavoriteButton({
  propertyId,
  propertyTitle,
  variant = 'overlay',
  className = '',
}) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const saved = isFavorite(propertyId);

  const variants = {
    overlay: saved
      ? 'border-transparent bg-champagne-400 text-ink'
      : 'border-white/30 bg-navy-950/45 text-white backdrop-blur-sm hover:border-white hover:bg-navy-950/70',
    plain: saved
      ? 'border-champagne-400 bg-champagne-50 text-champagne-600'
      : 'border-line bg-white text-navy-400 hover:border-navy-300 hover:text-navy-700',
  };

  return (
    <button
      type="button"
      aria-pressed={saved}
      aria-label={
        saved ? `Remove ${propertyTitle} from saved properties` : `Save ${propertyTitle}`
      }
      title={saved ? 'Saved' : 'Save property'}
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();
        toggleFavorite(propertyId);
      }}
      className={[
        'icon-btn h-10 w-10',
        variants[variant] ?? variants.overlay,
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <Heart
        aria-hidden="true"
        className="h-[17px] w-[17px] transition-transform duration-300 ease-premium"
        strokeWidth={1.8}
        fill={saved ? 'currentColor' : 'none'}
      />
    </button>
  );
}

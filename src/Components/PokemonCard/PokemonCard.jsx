import { useState, useEffect } from 'react';
import './styles.css';

export default function PokemonCard({ pokemon, expanded = false, onAddFavorite, onRemoveFavorite }) {
  // Aseguramos que pokemon tenga la estructura esperada
  const safePokemon = pokemon || {
    name: 'missingno',
    image: 'https://via.placeholder.com/200',
    types: ['normal'],
    height: 0,
    weight: 0,
    abilities: []
  };

  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('pokemonFavorites')) || [];
    setIsFavorite(favorites.some(fav => fav.id === safePokemon.id));
  }, [safePokemon.id]);

  const handleFavoriteAction = () => {
    if (isFavorite && onRemoveFavorite) {
      onRemoveFavorite(safePokemon.id);
      setIsFavorite(false);
    } else if (!isFavorite && onAddFavorite) {
      onAddFavorite(safePokemon);
      setIsFavorite(true);
    }
  };

  return (
    <div className={`pokemon-card ${expanded ? 'expanded' : ''}`}>
      <h3>{safePokemon.name.toUpperCase()}</h3>
      <img 
        src={safePokemon.image} 
        alt={safePokemon.name}
        className="pokemon-image"
        onError={(e) => e.target.src = 'https://via.placeholder.com/200'}
      />
      
      <div className="types-container">
        {safePokemon.types.map((type, index) => (
          <span key={index} className={`type-badge ${typeof type === 'string' ? type : type.type?.name}`}>
            {typeof type === 'string' ? type : type.type?.name}
          </span>
        ))}
      </div>

      {/* Botón de favoritos (solo visible si no es favorito y si hay función onAddFavorite) */}
      {(onAddFavorite || onRemoveFavorite) && (
        <button 
          onClick={handleFavoriteAction}
          className={`favorite-button2 ${isFavorite ? 'remove' : 'add'}`}
        >
          {isFavorite ? 'Eliminar de favoritos' : '❤ Añadir a favoritos'}
        </button>
      )}

      {/* Detalles expandidos */}
      {expanded && (
        <div className="details-section">
          <p>Height: {safePokemon.height}m</p>
          <p>Weight: {safePokemon.weight}kg</p>
          
          {safePokemon.abilities?.length > 0 && (
            <div className="abilities-container">
              <h4>Abilities:</h4>
              <ul>
                {safePokemon.abilities.map((ability, index) => (
                  <li key={index}>
                    {typeof ability === 'string' ? ability : ability.ability?.name}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
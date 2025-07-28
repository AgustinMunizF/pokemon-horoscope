import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import PokemonCard from '../../Components/PokemonCard/PokemonCard';
import './styles.css';

export default function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate(); 

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem('pokemonFavorites')) || [];
    setFavorites(savedFavorites);
  }, []);

  const removeFavorite = (pokemonId) => {
    const updatedFavorites = favorites.filter(p => p.id !== pokemonId);
    setFavorites(updatedFavorites);
    localStorage.setItem('pokemonFavorites', JSON.stringify(updatedFavorites));
  };

  // Nueva función para manejar el clic en la card
  const handleCardClick = (pokemon) => {
    navigate('/results', { state: { pokemon } });
  };

  return (
    <div className="favorites-view">
      <h2>Mis Pokémon Favoritos</h2>
      {favorites.length === 0 ? (
        <div className="empty-state">
          <p>Aún no tienes favoritos</p>
          <Link to="/search" className="search-link">
            Buscar Pokémon
          </Link>
        </div>
      ) : (
        <div className="favorites-list">
          {favorites.map(pokemon => (
            <div key={pokemon.id} className="favorite-item">
              <div 
                onClick={() => handleCardClick(pokemon)} // Añade este wrapper
                style={{ cursor: 'pointer' }} // Cambia el cursor para indicar que es clickeable
              >
                <PokemonCard pokemon={pokemon} />
              </div>
              <button 
                onClick={(e) => {
                  e.stopPropagation(); // Evita que el clic se propague al div padre
                  removeFavorite(pokemon.id);
                }}
                className="remove-button"
              >
                Eliminar
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
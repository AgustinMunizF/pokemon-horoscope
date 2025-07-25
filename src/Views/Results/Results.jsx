import { useLocation, useNavigate } from 'react-router-dom';
import PokemonCard from '../../Components/PokemonCard/PokemonCard';
import './styles.css';

export default function Results() {
  const { state } = useLocation();
  const navigate = useNavigate();

  // Funciones para manejar favoritos
  const addToFavorites = (pokemon) => {
    const favorites = JSON.parse(localStorage.getItem('pokemonFavorites')) || [];
    if (!favorites.some(p => p.id === pokemon.id)) {
      const updatedFavorites = [...favorites, pokemon];
      localStorage.setItem('pokemonFavorites', JSON.stringify(updatedFavorites));
    }
  };

  const removeFromFavorites = (pokemonId) => {
    const favorites = JSON.parse(localStorage.getItem('pokemonFavorites')) || [];
    const updated = favorites.filter(p => p.id !== pokemonId);
    localStorage.setItem('pokemonFavorites', JSON.stringify(updated));
  };

  // Caso 1: Resultados múltiples (búsqueda por tipo)
  if (state?.pokemon?.list) {
    return (
      <div className="results-container">
        <button onClick={() => navigate(-1)} className="back-btn">← Volver</button>
        <h2>Pokémon de tipo: {state.searchType?.toUpperCase()}</h2>
        
        <div className="pokemon-grid three-columns">
          {state.pokemon.list.map(pokemon => (
            <PokemonCard 
              key={pokemon.id}
              pokemon={pokemon}
              onAddFavorite={addToFavorites}
              onRemoveFavorite={removeFromFavorites}
            />
          ))}
        </div>
      </div>
    );
  }

  // Caso 2: Resultado único (búsqueda por nombre o combinada)
  const pokemon = state?.pokemon || { 
    name: 'Desconocido', 
    image: 'https://via.placeholder.com/200', 
    types: ['normal'] 
  };

  return (
    <div className="results-container">
      <button onClick={() => navigate(-1)} className="back-btn">← Volver</button>
      <h2>{pokemon.name.toUpperCase()}</h2>
      <PokemonCard 
        pokemon={pokemon} 
        expanded 
        onAddFavorite={addToFavorites} 
        onRemoveFavorite={removeFromFavorites}
      />
    </div>
  );
}
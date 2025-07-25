import './styles.css';
import PokemonCard from '../PokemonCard/PokemonCard';

export default function PokemonList({ pokemons, onRemove, showRemoveButton }) {
  return (
    <div className="pokemon-list">
      {pokemons.map(pokemon => (
        <div key={pokemon.id} className="pokemon-list-item">
          <PokemonCard pokemon={pokemon} />
          {showRemoveButton && (
            <button 
              onClick={() => onRemove(pokemon.id)}
              className="remove-button"
            >
              Remove
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
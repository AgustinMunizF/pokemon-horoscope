import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchForm from '../../Components/SearchForm/SearchForm';
import { fetchPokemonByName, fetchPokemonByType } from '../../Services/pokeAPI';
import './styles.css';

export default function SearchPokemon() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [navigationState, setNavigationState] = useState(null);

  useEffect(() => {
    if (navigationState) {
      navigate('/results', { state: { pokemon: navigationState } });
    }
  }, [navigationState, navigate]);

  const handleSearch = async ({ name, type }) => {
    if (!name && !type) return;
    
    setLoading(true);
    setError(null);
    
    try {
      let results = [];

      // Caso 1: Solo nombre
      if (name && !type) {
        results = [await fetchPokemonByName(name)];
      }
      // Caso 2: Solo tipo
      else if (!name && type) {
        results = await fetchPokemonByType(type);
      }
      // Caso 3: Nombre y tipo
      else {
        const byName = await fetchPokemonByName(name);
        if (byName.types.includes(type)) {
          results = [byName];
        } else {
          throw new Error(`No se encontró un Pokémon llamado "${name}" de tipo "${type}"`);
        }
      }

      // Manejo de resultados
      if (results.length === 0) {
        throw new Error('No se encontraron resultados');
      } else if (results.length === 1) {
        setNavigationState(results[0]);
      } else {
        // Para múltiples resultados (búsqueda por tipo)
        setNavigationState({ list: results });
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="search-view">
      <h1>Buscador Pokémon</h1>
      <p className="search-instructions">
        Busca por nombre, tipo o ambos criterios
      </p>
      <SearchForm onSearch={handleSearch} loading={loading} />
      
      {loading && <div className="loading-spinner">Cargando...</div>}
      {error && <div className="error-box">{error}</div>}
    </div>
  );
}
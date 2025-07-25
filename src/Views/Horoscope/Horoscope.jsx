import { useState, useEffect } from 'react';
import HoroscopeForm from '../../Components/HoroscopeForm/HoroscopeForm';
import PokemonCard from '../../Components/PokemonCard/PokemonCard';
import { calculateZodiacSign, calculateZodiacPokemon } from '../../Services/zodiac';
import './styles.css';

// Clave para LocalStorage
const STORAGE_KEY = 'pokemonHoroscopeHistory';

export default function Horoscope() {
  const [pokemon, setPokemon] = useState(null);
  const [userName, setUserName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [history, setHistory] = useState([]);

  // Cargar historial al iniciar
  useEffect(() => {
    const savedHistory = localStorage.getItem(STORAGE_KEY);
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  }, []);

  const handleSubmit = async (birthDate, name) => {
    if (!name.trim() || !birthDate) {
      setError('Por favor, completa todos los campos.');
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      const zodiacSign = calculateZodiacSign(birthDate);
      const pokemonForSign = await calculateZodiacPokemon(zodiacSign);
      
      if (!pokemonForSign) {
        throw new Error('No se pudo encontrar tu Pokémon zodiacal.');
      }

      // Crear nuevo registro
      const newEntry = {
        id: Date.now(),
        name,
        birthDate,
        zodiacSign,
        pokemon: pokemonForSign,
        date: new Date().toLocaleString()
      };

      // Actualizar estado y LocalStorage
      setUserName(name);
      setPokemon(pokemonForSign);
      const updatedHistory = [newEntry, ...history].slice(0, 10); // Limitar a 10 registros
      setHistory(updatedHistory);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedHistory));

    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="horoscope-view">
      <h2>Descubre tu Pokémon del zodiaco</h2>
      <HoroscopeForm onSubmit={handleSubmit} />
      
      {loading && <div className="loading">Buscando tu Pokémon...</div>}
      {error && <div className="error-message">{error}</div>}
      
      {pokemon && (
        <div className="result-container">
          <h3>{userName}, tu Pokémon zodiacal es:</h3>
          <PokemonCard pokemon={pokemon} expanded />
        </div>
      )}

      {/* Mostrar historial */}
      {history.length > 0 && (
        <div className="history-section">
          <h4>Tus horóscopos anteriores:</h4>
          <div className="history-list">
            {history.map((entry) => (
              <div key={entry.id} className="history-item">
                <p><strong>{entry.name}</strong> ({entry.zodiacSign})</p>
                <PokemonCard pokemon={entry.pokemon} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
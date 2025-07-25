import { useState } from 'react';
import './styles.css';

export default function SearchForm({ onSearch, loading }) {
  const [name, setName] = useState('');
  const [type, setType] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim() || type.trim()) {
      onSearch({ 
        name: name.trim(), 
        type: type.trim().toLowerCase() 
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="search-form">
      <div className="search-fields">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nombre del Pokémon"
          className="search-input"
          disabled={loading}
        />
        <input
          type="text"
          value={type}
          onChange={(e) => setType(e.target.value)}
          placeholder="Tipo (ej: fire, water, grass)"
          className="search-input"
          disabled={loading}
        />
      </div>
      <button 
        type="submit" 
        className="search-button-form"
        disabled={loading || (!name.trim() && !type.trim())}
      >
        {loading ? 'Buscando...' : 'Buscar Pokémon'}
      </button>
    </form>
  );
}
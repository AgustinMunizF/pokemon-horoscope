import { useState } from 'react';
import './styles.css';

export default function HoroscopeForm({ onSubmit }) {
  const [birthDate, setBirthDate] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(birthDate, name);
  };

  return (
    <form onSubmit={handleSubmit} className="horoscope-form">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Ingresa tu nombre"
        className="form-input"
        required
      />
      <input
        type="date"
        value={birthDate}
        onChange={(e) => setBirthDate(e.target.value)}
        className="form-input"
        required
        max={new Date().toISOString().split('T')[0]} 
      />
      <button type="submit" className="submit-button">
        Descubre tu Pokémon zodiacal
      </button>
    </form>
  );
}
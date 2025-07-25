import { Link } from 'react-router-dom';
import './styles.css';
import pokemonLogo from '../../assets/pokemon-logo.png';

export default function Home() {
  return (
    <div className="home-container">
        <img 
        src={pokemonLogo} 
        alt="Pokémon Logo" 
        className="pokemon-logo"
      />
      <h1>¡Bienvenido al Horóscopo Pokémon!</h1>
      
      <div className="action-buttons">
        <Link to="/search" className="action-button search-button">
          🔍 Buscar Pokémon
        </Link>
        <Link to="/horoscope" className="action-button horoscope-button">
           Mi Horóscopo Pokémon
        </Link>
      </div>
      
      <div className="secondary-action">
        <Link to="/favorites" className="action-button favorite-button">
           Ver mis favoritos
        </Link>
      </div>
    </div>
  );
}
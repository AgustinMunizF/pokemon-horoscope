import { Link } from 'react-router-dom';
import './styles.css';

export default function Layout({ children }) {
  return (
    <div className="layout">
      <header className="header">
        <nav className="navigation">
          <Link to="/" className="nav-link">HOME</Link>
          <Link to="/search" className="nav-link">SEARCH</Link>
          <Link to="/horoscope" className="nav-link">HOROSCOPE</Link>
          <Link to="/favorites" className="nav-link">FAVORITES</Link>
        </nav>
      </header>
      
      <main className="main-content">
        {children}
      </main>
      
      <footer className="footer">
        <p>Pokémon Horoscope</p>
      </footer>
    </div>
  );
}
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './Components/Layout/Layout';
import Home from './Views/Home/Home';
import SearchPokemon from './Views/SearchPokemon/SearchPokemon';
import Horoscope from './Views/Horoscope/Horoscope';
import Results from './Views/Results/Results';
import Favorites from './Views/Favorites/Favorites';
import './App.css';

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<SearchPokemon />} />
          <Route path="/horoscope" element={<Horoscope />} />
          <Route path="/results" element={<Results />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
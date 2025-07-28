const POKEAPI_BASE_URL = 'https://pokeapi.co/api/v2';

export const fetchPokemonByName = async (name) => {
  try {
    const response = await fetch(`${POKEAPI_BASE_URL}/pokemon/${name.toLowerCase()}`);
    if (!response.ok) throw new Error('Pokémon not found');
    return transformPokemonData(await response.json());
  } catch (error) {
    console.error('Error fetching Pokémon:', error);
    throw error;
  }
};

// En pokeAPI.js, modificar fetchPokemonByType para limitar resultados
export const fetchPokemonByType = async (type) => {
  try {
    const response = await fetch(`${POKEAPI_BASE_URL}/type/${type.toLowerCase()}`);
    if (!response.ok) throw new Error('Tipo no encontrado');
    const data = await response.json();
    
    // Limitar a 30 resultados y ordenar por ID
    const limitedPokemon = data.pokemon
      .sort((a, b) => a.pokemon.url.split('/').slice(-2, -1)[0] - b.pokemon.url.split('/').slice(-2, -1)[0])
      .slice(0, 150);

    return await Promise.all(
      limitedPokemon.map(async (entry) => {
        const pokemonRes = await fetch(entry.pokemon.url);
        return transformPokemonData(await pokemonRes.json());
      })
    );
  } catch (error) {
    console.error('Error fetching by type:', error);
    throw error;
  }
};


const transformPokemonData = (pokemon) => ({
  id: pokemon.id,
  name: pokemon.name,
  image: pokemon.sprites.other['official-artwork'].front_default || 
         pokemon.sprites.front_default,
  types: pokemon.types.map(t => t.type.name),
  height: pokemon.height / 10, // en metros
  weight: pokemon.weight / 10, // en kg
  abilities: pokemon.abilities.map(a => a.ability.name),
  stats: {
    hp: pokemon.stats[0].base_stat,
    attack: pokemon.stats[1].base_stat,
    defense: pokemon.stats[2].base_stat,
    speed: pokemon.stats[5].base_stat
  }
});

// Búsqueda general (nombre o tipo)
export const searchPokemon = async (query) => {
  try {
    // Primero intenta buscar por nombre
    return await fetchPokemonByName(query);
  } catch {
    // Si falla, busca por tipo
    return await fetchPokemonByType(query);
  }
};
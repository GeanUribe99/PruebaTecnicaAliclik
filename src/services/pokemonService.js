export const fetchPokemons = async () => {
    try {
      const response = await fetch("https://pokeapi.co/api/v2/pokemon");
      const data = await response.json();
  
      const detalles = await Promise.all(
        data.results.map(async (pokemon) => {
          const res = await fetch(pokemon.url);
          return res.json();
        })
      );
  
      return detalles;
    } catch (error) {
      console.error("Error al obtener Pokemones:", error);
      return [];
    }
  };
  
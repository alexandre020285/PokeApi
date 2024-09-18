const getPokemons = async (limit, offset) => {
  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
    );
    if (!response.ok) {
      throw new Error(`Erro ao buscar pokemons: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.log("Error ao buscar pokemons: " + error);
    return null;
  }
};

export default getPokemons;

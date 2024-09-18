import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PokemonTypeFilter from "../PokemonTypeSelector/PokemonTypeSelector";
import "./PokemonList.css";

const PokemonList = () => {
  const limitPage = 10;
  const [allPokemon, setAllPokemon] = useState([]);
  const [filteredPokemon, setFilteredPokemon] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedType, setSelectedType] = useState("");
  const navigate = useNavigate();

  const fetchPokemons = async (page) => {
    const url = selectedType
      ? `https://pokeapi.co/api/v2/type/${selectedType}`
      : `https://pokeapi.co/api/v2/pokemon?limit=${limitPage}&offset=${
          page * limitPage
        }`;

    const response = await fetch(url);
    const data = await response.json();

    let pokemonList;
    if (selectedType) {
      pokemonList = data.pokemon.map((p) => p.pokemon);
    } else {
      pokemonList = data.results;
    }

    const pokemonDetails = await Promise.all(
      pokemonList.map(async (poke) => {
        const pokeDetails = await (await fetch(poke.url)).json();
        return {
          id: pokeDetails.id,
          name: pokeDetails.name,
          img: pokeDetails.sprites.front_default,
          types: pokeDetails.types.map((t) => t.type.name),
        };
      })
    );

    if (selectedType) {
      setFilteredPokemon((prev) => [
        ...prev,
        ...pokemonDetails.filter(
          (p) => !prev.some((existing) => existing.id === p.id)
        ),
      ]);
    } else {
      setAllPokemon((prev) => [
        ...prev,
        ...pokemonDetails.filter(
          (p) => !prev.some((existing) => existing.id === p.id)
        ),
      ]);
    }
  };

  useEffect(() => {
    fetchPokemons(currentPage);
  }, [currentPage, selectedType]);

  useEffect(() => {
    setCurrentPage(0);
    setFilteredPokemon([]); 
  }, [selectedType]);

  return (
    <div className="pokemonList">
      <h1>Lista de Pokémons</h1>
      <PokemonTypeFilter onSelectType={setSelectedType} />

      <div className="pokemonCard-container">
        {(selectedType ? filteredPokemon : allPokemon)
          .slice(0, (currentPage + 1) * limitPage)
          .map((poke) => (
            <div
              className="pokemonCard"
              key={poke.id}
              onClick={() => navigate(`/pokemon/${poke.name}`)}
            >
              <p className="pokemonName">{poke.name}</p>
              <img src={poke.img} alt={poke.name} />
              <p className="pokemonType">Type</p>
              <p className="pokemonType-description">
                {poke.types.join(" - ")}
              </p>
            </div>
          ))}
      </div>

      <button
        onClick={() => setCurrentPage((prev) => prev + 1)}
        className="buttonMorePokemons"
      >
        <span>Carregar Próximos </span>
      </button>
    </div>
  );
};

export default PokemonList;

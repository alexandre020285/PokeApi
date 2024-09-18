import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; 
import "../PokemonDetails/PokemonDetalis.css";
const PokemonDetails = () => {
  const { name } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [abilitiesDetails, setAbilitiesDetails] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
      const data = await response.json();
      setPokemon(data);
      const abilitiesPromises = data.abilities.map(async (ability) => {
        const abilityResponse = await fetch(ability.ability.url);
        const abilityDetails = await abilityResponse.json();
        const firstDescription = abilityDetails.effect_entries[0];

        return {
          name: ability.ability.name,
          description: firstDescription
            ? firstDescription.effect
            : "No description available",
        };
      });

      const resolvedAbilitiesDetails = await Promise.all(abilitiesPromises);
      setAbilitiesDetails(resolvedAbilitiesDetails);
    };

    fetchPokemonDetails();
  }, [name]);

  if (!pokemon) return <div>Loading...</div>;
  return (
    <div className="pokemon-details">
      <h1>{pokemon.name}</h1>
      <div className="border-img">
        <i className="border-green"></i>
        <i className="border-red"></i>
        <i className="border-yellow"></i>
        <img src={pokemon.sprites.front_default} alt={pokemon.name} />
      </div>
      <p className="abilities">Abilities:</p>
      <ul>
        {abilitiesDetails.map((ability) => (
          <li className="description" key={ability.name}>
            <strong>{ability.name}</strong>: {ability.description}
          </li>
        ))}
      </ul>
      <p className="moves">Moves:</p>
      <ul>
        {pokemon.moves.slice(0, 5).map((move) => (
          <li className="description" key={move.move.name}>
            {move.move.name}
          </li>
        ))}
      </ul>
      <p className="types">Types:</p>
      <ul>
        {pokemon.types.map((type) => (
          <li className="description" key={type.type.name}>
            {type.type.name}
          </li>
        ))}
      </ul>

      <button onClick={() => navigate("/")} className="backButton">
        RETURN TO HOME MENU
      </button>
    </div>
  );
};

export default PokemonDetails;

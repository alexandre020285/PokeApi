import { useState, useEffect } from "react";
import "./PokemonTypeSelector.css";

const PokemonTypeFilter = ({ onSelectType }) => {
  const [types, setTypes] = useState([]);

  useEffect(() => {
    const fetchTypes = async () => {
      const response = await fetch("https://pokeapi.co/api/v2/type");
      const data = await response.json();
      setTypes(data.results);
    };

    fetchTypes();
  }, []);

  return (
    <div className="type-filter-container">
      <label className="type-filter" htmlFor="type-select">
        Filter by Type:{" "}
      </label>
      <select
        id="type-select"
        onChange={(e) => onSelectType(e.target.value)}
        className="type-select"
      >
        <option value="">All</option>
        {types.map((type) => (
          <option key={type.name} value={type.name}>
            {type.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default PokemonTypeFilter;

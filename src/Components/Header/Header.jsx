import "./Header.css";
import ToggleButton from "../ToggleButton/ToggleButton";

const Header = () => {
  const logoImg =
    "https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png";

  return (
    <div className="Header-pai">
      <div className="Header">
        <div className="logo">
          <img className="logoNavbar" src={logoImg} alt="pokeapi logo" />
        </div>
        <div className="togglerButton">
          <ToggleButton />
        </div>
      </div>
    </div>
  );
};

export default Header;


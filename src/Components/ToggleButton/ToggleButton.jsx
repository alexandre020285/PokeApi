import "../ToggleButton/ToggleButton.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import React, { useContext } from "react";
import { ThemeContext } from "../ThemerToggler/ThemeToggler";
import "../ThemerToggler/ThemeToggler";

const ToggleButton = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <button
      className={`toggle-button ${theme === "light" ? "light" : "dark"}`}
      onClick={toggleTheme}
    >
      <input type="checkbox" className="checkbox" id="chk" />
      <label className="label" htmlFor="chk">
        <i className="bi bi-moon"></i>
        <i className="bi bi-sun"></i>
        <div className="ball"></div>
      </label>
    </button>
  );
};

export default ToggleButton;

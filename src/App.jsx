import "./App.css";
import PokemonList from "./Components/PokemonList/PokemonList"; // Certifique-se do nome correto
import PokemonDetails from "./Components/PokemonDetails/PokemonDetails";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Importa React Router
import Header from "./Components/Header/Header";
import { ThemeProvider } from "./Components/ThemerToggler/ThemeToggler"; // Certifique-se do caminho correto
import './Components/PokemonList/PokemonList.css';


function App() {


  
  return (
    <ThemeProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<PokemonList />} />
          <Route path="/pokemon/:name" element={<PokemonDetails />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;

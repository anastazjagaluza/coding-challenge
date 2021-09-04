import { useEffect, useState } from 'react';
import './App.css';
import Card from "./components/Card";
import { ILimit, ICard } from "./types";

function App() {
  const [limit, setLimit] = useState<ILimit>(10);
  const [pokemons, setPokemons] = useState<Array<ICard>>([]);
  
  useEffect(() => {
    init();
  }, [])

  useEffect(() => {
    console.log({pokemons});
  }, [pokemons])

  const init = async () => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=0`);
    if (response.status == 200) {
      const data = await response.json();
      setPokemons(data.results);
    }
  }

  return (
    <div className="App">
      <div className="container">
        {pokemons.length > 0 
        ? pokemons.map((pokemon) => 
          <Card name={pokemon.name} url={pokemon.url} />
        )
        : <p>Loading</p>}
      </div>
    </div>
  );
}

export default App;

import React, { useEffect, useState } from 'react';
import './App.css';
import Card from "./components/Card";
import { ILimit, ICard } from "./types";

function App() {
  const [limit, setLimit] = useState<ILimit>(10);
  const [offset, setOffset] = useState<number>(0);
  const [maxLimit, setMaxLimit] = useState<number>(0);
  const [pokemons, setPokemons] = useState<Array<ICard>>([]);
  const [fetchUrl, setFetchUrl] = useState<string>("https://pokeapi.co/api/v2/pokemon");

  const isLastPage = () => {
    return offset * limit === maxLimit - limit;
  }
  const isFirstPage = () => {
    return offset < 1;
  }

  useEffect(() => {
    init();
  }, [offset, limit]);


  const handleOffset = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const target = e.target as HTMLButtonElement;
    if (target.textContent === "Previous") {
      if (offset > 0) {
        setOffset(offset - limit);
      }
      } else if (target.textContent === "Next") {
        if (offset * limit < maxLimit) {
          setOffset(offset + limit);
        }
    }
  }

  const init = async () => {
    const response = await fetch(`${fetchUrl}?limit=${limit}&offset=${offset}`);
    if (response.status === 200) {
      const data = await response.json();
      setPokemons(data.results);
      setMaxLimit(data.count);
    }
  }

  return (
    <div className="App">
      <div className="container-links">
        <button disabled={isFirstPage()} onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => handleOffset(e)}>Previous</button>
        <button disabled={isLastPage()} onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => handleOffset(e)}>Next</button>
      </div>
      <div className="container-cards">
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

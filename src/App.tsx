import React, { useEffect, useState } from 'react';
import './App.css';
import Card from "./components/Card/Card";
import Navigation from './components/Card/Navigation/Navigation';
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
    console.log({offset});
  }, [offset, limit]);


  const handleOffset = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const target = e.target as HTMLButtonElement;
    if (target.textContent === "Previous") {
        setOffset(offset - Number(limit));
      } else if (target.textContent === "Next") {
          setOffset(offset + Number(limit));
    }
  }

  const handleLimit = (v: ILimit) => {
    setLimit(v);
  }

  const init = async () => {
    const response = await fetch(`${fetchUrl}?limit=${limit}&offset=${offset}`);
    if (response.status === 200) {
      const data = await response.json();
      setPokemons(data.results);
      setMaxLimit(data.count);
      console.log({data});
    }
  }

  return (
    <div className="App">
      <Navigation isFirstPage={isFirstPage()} isLastPage={isLastPage()} handleOffset={handleOffset} currentLimit={limit} handleLimit={(v: ILimit) => handleLimit(v)} />
      <div className="container-cards">
        {pokemons.length > 0 
        ? pokemons.map((pokemon) => 
          <Card name={pokemon.name} url={pokemon.url} />
        )
        : <p>Loading</p>}
      </div>
      <Navigation isFirstPage={isFirstPage()} isLastPage={isLastPage()} handleOffset={handleOffset} currentLimit={limit} handleLimit={(v: ILimit) => handleLimit(v)} />
    </div>
  );
}

export default App;

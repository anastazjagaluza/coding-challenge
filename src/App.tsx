import React, { useEffect, useRef, useState } from 'react';
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
  const cards = useRef(null);

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
    }
  }

  return (
    <div className="App">
      <Navigation isFirstPage={isFirstPage()} isLastPage={isLastPage()} handleOffset={handleOffset} currentLimit={limit} handleLimit={(v: ILimit) => handleLimit(v)} />
      <div ref={cards} className="container-cards">
        {pokemons.length > 0 
        ? pokemons.map((pokemon) => 
          <Card name={pokemon.name} url={pokemon.url} />
        )
        : <p>Loading</p>}
      </div>
      <Navigation isFirstPage={isFirstPage()} isLastPage={isLastPage()} handleOffset={handleOffset} handleLimit={(v: ILimit) => handleLimit(v)} />
    {limit > 10 && (<button onClick={() => window.scrollTo(0, 0)} className="button-scrollup">↑</button>)}
    </div>
  );
}

export default App;

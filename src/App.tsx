import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import Card from "./components/Card/Card";
import Navigation from './components/Card/Navigation/Navigation';
import { ILimit, ICard, IPokemon, IPokeData } from "./types";

function App() {
  const [limit, setLimit] = useState<ILimit>(10);
  const [offset, setOffset] = useState<number>(0);
  const [maxLimit, setMaxLimit] = useState<number>(0);
  const [sortBy, setSortBy] = useState<string>("Name");
  const [pokeData, setPokeData] = useState<IPokeData[]>([]);
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

  useEffect(() => {
    handleSortBy();
  }, [sortBy]);
  

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
  
  const handleSortBy = () => {
    switch(sortBy) {
      case "Name":
        setPokeData([...pokeData.sort((a: IPokeData, b: IPokeData) => (a.name > b.name) ? 1 : -1)]);
        break;
      case "Height":
        setPokeData([...pokeData.sort((a: IPokeData, b: IPokeData) => (a.height > b.height) ? 1 : -1)]);
        break;
      case "Weight":
        setPokeData([...pokeData.sort((a: IPokeData, b: IPokeData) => (a.weight > b.weight) ? 1 : -1)]);
        break;
    }
  }

  const init = async () => {
    const response = await fetch(`${fetchUrl}?limit=${limit}&offset=${offset}`);
    if (response.status === 200) {
      const data = await response.json();
      for (const item of data.results) {
        getAndSavePokeData(item.url);
      }
      setMaxLimit(data.count);
    }
  }

  const getAndSavePokeData = async (url: string) => {
    const response = await fetch(url);
    if (response.status === 200) {
      const data = await response.json();
      const { height, weight } = data;
      const image = data.sprites.other["official-artwork"]["front_default"];
      const abilities: string[] = [];
      for (const item of data.abilities) {
        abilities.push(item.ability.name);
      };
      const name = data.name[0].toUpperCase() + data.name.slice(1);
      const newPokeData = { name, height, weight, abilities: abilities.toString().replace(",", ", "), image};
      const currentData = pokeData;
      currentData.push(newPokeData);
      setPokeData([...currentData]);
    }
  }

  return (
    <div className="App">
      <Navigation 
        isFirstPage={isFirstPage()} 
        isLastPage={isLastPage()} 
        handleOffset={handleOffset} 
        currentLimit={limit} 
        handleLimit={(v: ILimit) => handleLimit(v)}
        handleSortBy={(v: string) => setSortBy(v)}
       />
      <div ref={cards} className="container-cards">
        {pokeData.length > 0 
        ? pokeData.map((pokemon) => 
          <Card name={pokemon.name} weight={pokemon.weight} height={pokemon.height} abilities={pokemon.abilities} image={pokemon.image} />
        )
        : <p>Loading</p>}
      </div>
      <Navigation isFirstPage={isFirstPage()} isLastPage={isLastPage()} handleOffset={handleOffset} handleLimit={(v: ILimit) => handleLimit(v)} />
    {limit > 10 && (<button onClick={() => window.scrollTo(0, 0)} className="button-scrollup">↑</button>)}
    </div>
  );
}

export default App;

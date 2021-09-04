import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import Card from "./components/Card/Card";
import Navigation from './components/Card/Navigation/Navigation';
import { ILimit, IPokeData } from "./types";

function App() {
  const [limit, setLimit] = useState<ILimit>(10);
  const [offset, setOffset] = useState<number>(0);
  const [maxLimit, setMaxLimit] = useState<number>(0);
  const [sortBy, setSortBy] = useState<string>();
  const [searchValue, setSearchValue] = useState<string>();
  const [searchCategory, setSearchCategory] = useState<string>();
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
    if (document.location != null) {
      const location = document.location as unknown as string;
      let params = (new URL(location)).searchParams;
      const limit = Number(params.get("limit"));
      if (limit === 10 || limit === 20 || limit === 50) {
        setLimit(limit);
      }
    }
  }, [])

  useEffect(() => {
    setPokeData([]);
    init();
  }, [offset, limit, fetchUrl]);

  useEffect(() => {
    handleSortBy();
  }, [sortBy]);

  useEffect(() => {
    if (searchCategory != null && searchValue != null) {
      handleSearch();
    }
  }, [searchValue, searchCategory])
  

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

  useEffect(() => {
    console.log({pokeData});
  }, [pokeData])
  
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
      const newPokeData: IPokeData[] = [];
      for (const item of data.results) {
        const newItem = await getAndSavePokeData(item.url);
        if (newItem != null) {
          newPokeData.push(newItem);
        }
      }
      if (newPokeData != null) {
        setPokeData(newPokeData);
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
      return newPokeData;
    }
  }

  const handleSearch = () => {
    if (searchValue != null && searchCategory != null) {
      const newPokeData: IPokeData[] = [];
      if (searchCategory === "name") {
      for (const pokemon of pokeData) {
        if (pokemon.name.toLowerCase() === searchValue.toLowerCase()) {
          newPokeData.push(pokemon);
        }
      }
    } else if (searchCategory === "abilities") {
      for (const pokemon of pokeData) {
        if (pokemon.abilities.includes(searchValue.toLowerCase())) {
          console.log(pokemon.abilities);
          newPokeData.push(pokemon);
        }
      }
    }
      if (newPokeData.length > 0) {
        setPokeData([...newPokeData]);
      } else {
        console.log("show error");
      }
    }

  }

  const handleSearhValues = (v: Record<string, string>) => {
    const { searchValue, searchCategory } = v;
    if (searchValue != null) setSearchValue(searchValue);
    if (searchCategory != null) setSearchCategory(searchCategory);
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
        handleSearch={(v: Record<string, string>) => handleSearhValues(v)}
        />
      <div ref={cards} className="container-cards">
        {pokeData.length > 0 
        ? pokeData.map((pokemon, i) => 
          <Card key={`${pokemon.name}-${i}`} name={pokemon.name} weight={pokemon.weight} height={pokemon.height} abilities={pokemon.abilities} image={pokemon.image} />
        )
        : <p>Loading</p>}
      </div>
    
      <div className="container-links-bottom">
          <button disabled={isFirstPage()} onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => handleOffset(e)}>Previous</button>
          <button disabled={isLastPage()} onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => handleOffset(e)}>Next</button>
      </div>

    {limit > 10 && (<button onClick={() => window.scrollTo(0, 0)} className="button-scrollup">↑</button>)}
    </div>
  );
}

export default App;

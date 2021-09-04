import React, { useEffect, useState } from 'react';
import './App.css';
import Card from "./components/Card/Card";
import Detail from './components/Detail/Detail';
import Navigation from './components/Navigation/Navigation';
import { sortables } from './util/constants';
import { ILimit, IPokeData } from "./util/types";

function App() {
  const [limit, setLimit] = useState<ILimit>(10);
  const [offset, setOffset] = useState<number>(0);
  const [maxLimit, setMaxLimit] = useState<number>(0);
  const [sortBy, setSortBy] = useState<string>();
  const [searchValue, setSearchValue] = useState<string>();
  const [searchCategory, setSearchCategory] = useState<string>();
  const [pokeData, setPokeData] = useState<IPokeData[]>([]);
  const [detail, setDetail] = useState<[] | null>(null);
  const fetchUrl = "https://pokeapi.co/api/v2/pokemon";

  /**
   * Initially we need to apply any potential changes to the fetch from url
   */
  useEffect(() => {
    applyValuesFromUrlParams();
  }, [])

  /**
   * On every upade of the values that can affect the data, we need to fetch all over again. In order to avoid data duplication
   * the array pokeData needs to be initially cleared.
   */
  useEffect(() => {
    init();
  }, [offset, limit, fetchUrl]);

  /**
   * If the sortby is updated, we need to sort data appropriately.
   */

  useEffect(() => {
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

    handleSortBy();
  }, [sortBy]);

  /**
   * When the search-related data is updated, we also update the search
   */
  useEffect(() => {
    if (searchCategory != null && searchValue != null) {
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
      handleSearch();
    } else {
      init();
    }
  }, [searchValue, searchCategory])
  

  /**
   * In order to preserve the user passed values for limit, offset or search, the need to be picked up from the params.
   */
  const applyValuesFromUrlParams = () => {
    if (document.location != null) {
      const location = document.location as unknown as string;
      const params = (new URL(location)).searchParams;
      
      // apply limit from params
      const limit = Number(params.get("limit"));
      if (limit === 10 || limit === 20 || limit === 50) {
        setLimit(limit);
      }
      
      // apply offset from params
      const offset = Number(params.get("offset"));
      if (offset != null) {
        setOffset(offset);
      }
      
      // apply search from params, both have to be present to work
      const searchValue = params.get("search");
      const searchCategory = params.get("category");
      
      // limit and offset are not a thing for searching
      if (searchValue != null && searchCategory != null && limit === null && offset === null) {
        setSearchCategory(searchCategory);
        setSearchValue(searchValue);
      }
      
      const sortBy = params.get("sortBy");
      if (sortBy != null && (sortables.includes(sortBy))) {
        setSortBy(sortBy);
      }
      
    }
  }

  const init = async () => {
    setPokeData([]);
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

  const isLastPage = () => {
    return offset * limit === maxLimit - limit;
  }
  const isFirstPage = () => {
    return offset < 1;
  }


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

  const handleSearhValues = (v: Record<string, string>) => {
    const { searchValue, searchCategory } = v;
    if (searchValue != null) setSearchValue(searchValue);
    if (searchCategory != null) setSearchCategory(searchCategory);
  }

  const handleShowDetail = async (pokemonName: string) => {
    const response = await fetch(`${fetchUrl}/${pokemonName.toLowerCase()}`);
    if (response.status === 200) {
      const data = await response.json();
      console.log({data});
      setDetail(data);
    }
  }

  return (
    <div className="App">
      {detail == null ? (
        <>
          <div className="container-links">
              <button disabled={isFirstPage()} onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => handleOffset(e)}>Previous</button>
              <button disabled={isLastPage()} onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => handleOffset(e)}>Next</button>
          </div>
          <Navigation 
            isFirstPage={isFirstPage()} 
            isLastPage={isLastPage()} 
            handleOffset={handleOffset} 
            currentLimit={limit} 
            handleLimit={(v: ILimit) => handleLimit(v)}
            handleSortBy={(v: string) => setSortBy(v)}
            handleSearch={(v: Record<string, string>) => handleSearhValues(v)}
            />
          <div className="container-cards">
            {pokeData.length > 0
            ? pokeData.map((pokemon, i) => 
              <Card 
              key={`${pokemon.name}-${i}`} 
              name={pokemon.name} 
              weight={pokemon.weight} 
              height={pokemon.height} 
              abilities={pokemon.abilities} 
              image={pokemon.image}
              showDetail={() => handleShowDetail(pokemon.name)}
              />
              )
              : <p>Loading</p>}
          </div>

    
      <div className="container-links">
          <button disabled={isFirstPage()} onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => handleOffset(e)}>Previous</button>
          <button disabled={isLastPage()} onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => handleOffset(e)}>Next</button>
      </div>

    {limit > 10 && (<button onClick={() => window.scrollTo(0, 0)} className="button-scrollup">↑</button>)}
      </>
      ) : (
                <>
                <button onClick={() => setDetail(null)} className="button-back">Go back</button>
                <Detail {...detail} />
                </>
             )}
    </div>
  );
}

export default App;

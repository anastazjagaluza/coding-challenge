import { useEffect, useState } from "react";
import { ICard, IPokeData } from "../../types";
import './Card.css';

function Card({name, url}: ICard) {
  const [pokeData, setPokeData] = useState<IPokeData>({name: "", height: "", weight: "", abilities: "", image: ""});

  useEffect(() => {
    getPokeData();
  }, [url])
  
  const getPokeData = async () => {
    const response = await fetch(url);
    if (response.status === 200) {
      const data = await response.json();
      const { height, weight } = data;
      const image = data.sprites.other["official-artwork"]["front_default"];
      const abilities: string[] = [];
      for (const item of data.abilities) {
        abilities.push(item.ability.name);
      }
      const newPokeData = {name, height, weight, abilities: abilities.toString().replace(",", ", "), image};
      setPokeData(newPokeData);
    }
  }

  const { weight, height, abilities, image } = pokeData;

  return (
    <div className="card-container">
     <img src={image}/>
     <h1>{name}</h1>
     <p>Height: {height}, Weight: {weight}</p>
     <p>Abilities: {abilities}</p>
    </div>
  );
}

export default Card;

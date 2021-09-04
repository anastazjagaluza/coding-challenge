import { useEffect, useState } from "react";
import { ICard, IPokeData } from "../types";
import './Card.css';

function Card({name, url}: ICard) {
  const [frontSide, switchSide] = useState(true);
  const [pokeData, setPokeData] = useState<IPokeData>({name: "", height: "", weight: "", abilities: "", image: ""});

  useEffect(() => {
    getPokeData();
  }, [])
  
  const getPokeData = async () => {
    const response = await fetch(url);
    if (response.status == 200) {
      const data = await response.json();
      const { height, weight } = data;
      const image = data.sprites.other["official-artwork"]["front_default"];
      const abilities = data.abilities.map((ability: Record<string, string>) => ability.name);
      setPokeData({name, height, weight, abilities, image});
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

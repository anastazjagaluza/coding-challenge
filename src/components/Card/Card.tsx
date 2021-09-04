import { useEffect, useState } from "react";
import { ICard, IPokeData } from "../../types";
import './Card.css';

function Card({name, weight, height, abilities, image}: IPokeData) {

  return (
    <div className="card-container">
     <img src={image}/>
     <h3>{name}</h3>
     <p>Height: {height}, Weight: {weight}</p>
     <p>Abilities: {abilities}</p>
    </div>
  );
}

export default Card;

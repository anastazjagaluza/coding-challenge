import { IPokeData } from "../../util/types";
import './Card.css';

function Card({name, weight, height, abilities, image, showDetail}: IPokeData) {

  return (
    <div className={"card-container " + (showDetail != null && " shadow")} onClick={() => showDetail != null && showDetail()}>
     <img alt="pokemon" src={image}/>
     <h3>{name}</h3>
     <p>Height: {height}, Weight: {weight}</p>
     <p>Abilities: {abilities}</p>
    </div>
  );
}

export default Card;

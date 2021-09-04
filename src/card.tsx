interface ICard {
    image: string;
    name: string;
    height: number;
    weight: number;
    abilities: string;
}
function Card({image, name, height, weight, abilities}: ICard) {

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

import './Detail.css';
import { JsonToTable } from "react-json-to-table";

function Detail(props: any) {
    const image = props.sprites.other["official-artwork"]["front_default"];
    const { name, height, weight } = props;
    const abilities: string[] = [];
    for (const item of props.abilities) {
        abilities.push(item.ability.name);
    };

    const forms: string[] = [];
    for (const item of props.forms) {
        forms.push(item.name);
    };

    const destructuredKeys = ["name", "sprites"]

    console.log(props)

  return (
    <div className="card-container-detail">
        <JsonToTable json={props} />
    </div>
  );
}

export default Detail;

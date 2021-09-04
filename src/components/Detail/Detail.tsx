import './Detail.css';
import { JsonToTable } from "react-json-to-table";

function Detail(props: any) {
    const abilities: string[] = [];
    for (const item of props.abilities) {
        abilities.push(item.ability.name);
    };

    const forms: string[] = [];
    for (const item of props.forms) {
        forms.push(item.name);
    };

  return (
    <div className="card-container-detail">
        <JsonToTable json={props} />
    </div>
  );
}

export default Detail;

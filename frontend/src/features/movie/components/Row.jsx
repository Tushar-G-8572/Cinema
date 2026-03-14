import Card from "./Card.jsx";
import "../styles/row.scss";

export default function Row({title,data}) {
  return (
    <div className="row">
      <h2>{title}</h2>

      <div className="rowPosters">
        {
          data.map((item)=>(
            <Card key={item.id} item={item}/>
          ))
        }
      </div>
    </div>
  );
}
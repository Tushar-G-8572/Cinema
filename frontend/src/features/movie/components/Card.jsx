import "../styles/card.scss";

export default function Card({item}) {
  return (
    <div className="card">
      <img src={item.poster} alt={item.title}/>
      <p>{item.title}</p>
    </div>
  );
}
import Banner from "../components/Banner.jsx";
import Row from "../components/Row.jsx";
import "../styles/home.scss";

const movieData = [
  {
    id:1,
    title:"Avengers",
    poster:"https://image.tmdb.org/t/p/w500/RYMX2wcKCBAr24UyPD7xwmjaTn.jpg"
  },
  {
    id:2,
    title:"Batman",
    poster:"https://image.tmdb.org/t/p/w500/74xTEgt7R36Fpooo50r9T25onhq.jpg"
  },
  {
    id:3,
    title:"Interstellar",
    poster:"https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg"
  },
  {
    id:4,
    title:"Joker",
    poster:"https://image.tmdb.org/t/p/w500/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg"
  }
];

const tvData = [
  {
    id:1,
    title:"Stranger Things",
    poster:"https://image.tmdb.org/t/p/w500/49WJfeN0moxb9IPfGn8AIqMGskD.jpg"
  },
  {
    id:2,
    title:"Dark",
    poster:"https://image.tmdb.org/t/p/w500/apbrbWs8M9lyOpJYU5WXrpFbk1Z.jpg"
  },
  {
    id:3,
    title:"Money Heist",
    poster:"https://image.tmdb.org/t/p/w500/reEMJA1uzscCbkpeRJeTT2bjqUp.jpg"
  }
];

export default function Home() {
  return (
    <div className="home">
      <Banner/>

      <Row title="Popular Movies" data={movieData}/>
      <Row title="Trending TV Shows" data={tvData}/>
      <Row title="Top Rated Movies" data={movieData}/>
      <Row title="Action Movies" data={movieData}/>
    </div>
  );
}
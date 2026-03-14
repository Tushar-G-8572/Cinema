import "../styles/banner.scss";

export default function Banner() {
  return (
    <div className="banner">
      <img
        src="https://image.tmdb.org/t/p/original/qJ2tW6WMUDux911r6m7haRef0WH.jpg"
        alt=""
      />

      <div className="bannerContent">
        <h1>Avengers Endgame</h1>
        <p>
          After the devastating events of Infinity War, the Avengers assemble once more.
        </p>

        <div className="buttons">
          <button className="play">Watch Now</button>
          <button className="info">More Info</button>
        </div>
      </div>
    </div>
  );
}
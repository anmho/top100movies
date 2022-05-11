import styles from "./styles/Movie.module.css";

export default function Movie({ movie, onPosterClicked }) {
  const poster = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
  return (
    <div className="col-2">
      {/* <h5 className="pt-2 title">
        {movie.title.slice(0, 18)} {movie.title.length > 17 ? "..." : ""}
      </h5> */}
      <img
        className={`img-thumbnail poster ${styles["poster"]}`}
        src={poster}
        alt={`Poster for ${movie.title}`}
        onClick={() => onPosterClicked(movie)}
      />
    </div>
  );
}

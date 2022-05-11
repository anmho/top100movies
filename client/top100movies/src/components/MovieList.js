import Movie from "./Movie.js";

function MovieList({ movies, onPosterClicked }) {
  return (
    <div className="container">
      <div className="row">
        {movies ? (
          movies.map((movie, i) => {
            return movie.poster_path ? (
              <Movie movie={movie} key={i} onPosterClicked={onPosterClicked} />
            ) : null;
          })
        ) : (
          <p>No movies to show</p>
        )}
      </div>
    </div>
  );
}

export default MovieList;

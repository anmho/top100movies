function MovieList({ userMovies }) {
  const renderMovie = (movie) => {
    const poster = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
    return (
      <div className="col-2">
        <h5 className="pt-2 title">
          {movie.title.slice(0, 18)} {movie.title.length > 17 ? "..." : ""}
        </h5>
        <img
          className="img-thumbnail poster"
          src={poster}
          alt={`Poster for ${movie.title}`}
        />
      </div>
    );
  };

  return (
    <div className="container">
      <h3>Movie List</h3>
      <div className="row">
        {userMovies ? (
          userMovies.map((movie) => renderMovie(movie))
        ) : (
          <p>No movies to show</p>
        )}
      </div>
    </div>
  );
}

export default MovieList;

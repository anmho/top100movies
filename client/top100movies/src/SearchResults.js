import "./SearchResults.css";

function SearchResults({ userMovies, results: searchResults, setMovies }) {
  console.log(searchResults);

  const addMovie = (movie) => {
    console.log(movie);
    setMovies([...userMovies, movie]);
    console.log(userMovies);
  };

  const onPosterClicked = (movie) => {
    addMovie(movie);
  };

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
          onClick={() => onPosterClicked(movie)}
        />
      </div>
    );
  };

  return (
    <div className="container">
      <div className="row g-2">
        {searchResults.map((movie) => renderMovie(movie))}
      </div>
    </div>
  );
}

export default SearchResults;

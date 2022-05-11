import styles from "./styles/SearchResults.module.css";
import MovieList from "./MovieList.js";

function SearchResults({ userMovies, results: searchResults, setMovies }) {
  console.log(searchResults);

  const addMovie = (movie) => {
    console.log(movie);
    setMovies([...userMovies, movie]);
    console.log(userMovies);
  };

  const onPosterClicked = (movie) => {
    if (userMovies.includes(movie)) return;
    addMovie(movie);
  };

  return (
    <div className="container">
      <div className="row g-2">
        <MovieList movies={searchResults} onPosterClicked={onPosterClicked} />
      </div>
    </div>
  );
}

export default SearchResults;

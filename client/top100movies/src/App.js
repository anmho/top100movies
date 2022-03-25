// import "./App.css";
import SearchBar from "./SearchBar";
import { useState } from "react";
import SearchResults from "./SearchResults";
import MovieList from "./MovieList";
import Button from "./Button";

function App() {
  const [query, setQuery] = useState("");
  const [userMovies, setUserMovies] = useState([]);
  const [results, setSearchResults] = useState([]);
  const [searchActive, setSearchActive] = useState(false);

  const updateQuery = (query) => {
    console.log("updateQuery", query);
    setQuery(query);
    const base = "http://127.0.0.1:5000";
    const urlMovies = new URL("/api/movies/", base);
    urlMovies.searchParams.append("query", query);
    console.log(urlMovies.href);

    fetch(urlMovies)
      .then((response) => response.json())
      .then((data) => setSearchResults(data["results"]));
  };

  return (
    <div className="App" style={{ textAlign: "center" }}>
      <h1>Top 5 Movies</h1>
      <MovieList userMovies={userMovies} />
      <Button
        label={searchActive ? "Save" : "Add Movies"}
        onButtonClicked={() => setSearchActive(!searchActive)}
        margin="mt-2"
      />
      {searchActive && <SearchBar updateQuery={updateQuery} />}
      {searchActive && (
        <SearchResults
          userMovies={userMovies}
          results={results}
          setMovies={setUserMovies}
        />
      )}
    </div>
  );
}

export default App;

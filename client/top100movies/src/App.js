import "./App.css";
import SearchBar from "./SearchBar";
import { useState } from "react";
import SearchResults from "./components/SearchResults";
import MovieList from "./components/MovieList";
import Button from "./components/Button";
import auth from "./services/authService";
import { searchMovies } from "./services/movieService";
import LoginModal from "./components/LoginModal";

function App() {
  const [query, setQuery] = useState("");
  const [userMovies, setUserMovies] = useState([]);
  const [results, setSearchResults] = useState([]);
  const [searchActive, setSearchActive] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [token, setToken] = useState();
  const [user, setUser] = useState({});

  const search = async (query) => {
    console.log("updateQuery", query);
    setQuery(query);

    const results = await searchMovies(query);
    console.log(results);
    setSearchResults(results);
  };

  const saveMovies = () => {
    console.log(userMovies);
  };

  const removeMovie = (movie) => {
    const index = userMovies.indexOf(movie);
    const movies = [...userMovies];
    movies.splice(index, 1);
    setUserMovies(movies);
  };

  const login = async (username, password) => {
    let response = await auth.login(username, password);
    if (response.ok) {
      // Get token
      const data = await response.json();
      setToken(data.token);
      localStorage.setItem("token", data.token);
    } else {
      throw new Error("Login Unauthorized");
    }
    console.log(token);
    // Use token to get current user

    response = await auth.getCurrentUser(username, token);
    // Save the current user
    if (response.ok) {
      const user = await response.json();
      setUser(user);
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      <LoginModal login={login} />
      {/* <button onClick={test}>Get User</button> */}

      {/* {!loggedIn && (
        <form onSubmit={(e) => handleSubmit(e)}>
          <input type="text" onChange={(e) => setUsername(e.target.value)} />
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button label="Log In" />
        </form>
      )}

      {loggedIn && (
        <button className="btn btn-primary" onClick={() => handleSignOut()}>
          Sign Out
        </button>
      )} */}

      <h1>WatchList</h1>
      <div>
        <h3>Your Movies</h3>
        {userMovies && (
          <MovieList movies={userMovies} onPosterClicked={removeMovie} />
        )}
      </div>

      {/* Add/Search Button */}
      {!searchActive && (
        <Button
          label={<i className={"bi bi-plus"} />}
          className={"circular"}
          onButtonClicked={() => setSearchActive(!searchActive)}
          margin="mt-2"
        />
      )}

      {/* Save Button */}
      {searchActive && (
        <Button
          label="Save"
          className={"circular"}
          onButtonClicked={() => {
            saveMovies();
            setSearchActive(!searchActive);
          }}
        />
      )}

      {searchActive && <SearchBar updateQuery={search} />}

      {searchActive && query && (
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

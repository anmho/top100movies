import "./App.css";
import SearchBar from "./components/SearchBar";
import { useContext, useEffect, useState } from "react";
import SearchResults from "./components/SearchResults";
import MovieList from "./components/MovieList";
// import Button from "./components/Button";
import { Flex, Center, IconButton } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import auth from "./services/authService";
import { searchMovies } from "./services/movieService";
import LoginModal from "./components/LoginModal";
import LogoutModal from "./components/LogoutModal";
import UserContext from "./contexts/userContext.js";

function App() {
  const [query, setQuery] = useState("");
  const [userMovies, setUserMovies] = useState([]);
  const [results, setSearchResults] = useState([]);
  const [searchActive, setSearchActive] = useState(false);
  const { user, setUser, isLoggedIn, setLoggedIn } = useContext(UserContext);
  const search = async (query) => {
    console.log("updateQuery", query);
    setQuery(query);

    const results = await searchMovies(query);
    console.log(results);
    setSearchResults(results);
  };

  // Load the user content
  useEffect(() => {
    // Try to load current user
    // if successfully loads user, token was still valid/token is present
    const fetchUser = async () => {
      const user = await auth.getCurrentUser();
      if (!user) return;
      setUser(user);
      setLoggedIn(true);
    };
    fetchUser();
  }, [setUser, setLoggedIn]);
  console.log(isLoggedIn);

  const saveMovies = () => {
    console.log(userMovies); // => UPDATE /api/users/{username}
  };

  const removeMovie = (movie) => {
    const index = userMovies.indexOf(movie);
    const movies = [...userMovies];
    movies.splice(index, 1);
    setUserMovies(movies);
  };

  const logOut = async () => {
    setLoggedIn(false);
    localStorage.removeItem("token");
  };

  return (
    <div style={{ textAlign: "center" }}>
      {!isLoggedIn ? <LoginModal /> : <LogoutModal logOut={logOut} />}

      <h1>WatchList</h1>
      <div>
        <h3>Your Movies</h3>
        {userMovies && (
          <MovieList movies={userMovies} onPosterClicked={removeMovie} />
        )}
      </div>

      {/* Add/Search Button */}
      <IconButton
        aria-label="Add Movie"
        borderRadius={"full"}
        onClick={() => setSearchActive(!searchActive)}
        icon={<AddIcon />}
        colorScheme="blue"
      />

      {/* Save Button */}
      {searchActive && <SearchBar updateQuery={search} />}
      {/* Search Results */}
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

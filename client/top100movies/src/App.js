import "./App.css";
import SearchBar from "./components/SearchBar";
import { useContext, useEffect, useState } from "react";
import SearchResults from "./components/SearchResults";
import MovieList from "./components/MovieList";
// import Button from "./components/Button";
import { Button, Flex, Center, IconButton } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import auth from "./services/authService";
import movieService from "./services/movieService";
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
    // else logout

    const fetchUser = async () => {
      const user = await auth.getCurrentUser();
      if (!user) {
        auth.logout();
        return;
      }
      setUser(user);
      setLoggedIn(true);

      const loadMovies = async () => {
        const movies = [];
        for (const { id } of user.movies) {
          const movie = await movieService.getMovieById(id);
          console.log(movie);
          movies.push(movie);
        }
        setUserMovies(movies);
      };

      await loadMovies();
    };
    // render user's movies into usermovies and fetch poster data
    fetchUser();
  }, [setUser, setLoggedIn]);

  const removeMovie = (movie) => {
    const index = user.movies.indexOf(movie);
    const newMovies = [...userMovies];
    newMovies.splice(index, 1);
    setUserMovies(newMovies);
  };

  const saveMovies = () => {
    console.log(userMovies);
    console.log(user.movies);

    // const updatedUser = {...user}
    // updatedUser.movies = movies;

    // user.movies = movies;
  };

  return (
    <div style={{ textAlign: "center" }}>
      {!isLoggedIn ? <LoginModal /> : <LogoutModal />}

      <h1>WatchList</h1>
      {isLoggedIn && (
        <div>
          <h3>Your Movies</h3>
          {isLoggedIn && (
            <MovieList movies={userMovies} onPosterClicked={removeMovie} />
          )}
        </div>
      )}

      {/* Add/Search Button */}
      <IconButton
        m={4}
        aria-label="Add Movie"
        borderRadius={"full"}
        onClick={() => setSearchActive(!searchActive)}
        icon={<AddIcon />}
        colorScheme="blue"
      />
      <Button onClick={saveMovies}>Save</Button>

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

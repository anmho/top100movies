import "./App.css";
import SearchBar from "./components/SearchBar";
import { useContext, useEffect, useState } from "react";
import SearchResults from "./components/SearchResults";
import MovieList from "./components/MovieList";
// import Button from "./components/Button";
import {
  Box,
  Heading,
  Button,
  Flex,
  Center,
  IconButton,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import auth from "./services/authService";
import movieService from "./services/movieService";
import userService from "./services/userService";
import { searchMovies } from "./services/movieService";
import LoginModal from "./components/LoginModal";
import LogoutModal from "./components/LogoutModal";
import UserContext from "./contexts/userContext.js";

function App() {
  const [query, setQuery] = useState("");
  const [userMovies, setUserMovies] = useState([]);
  const [userRecs, setUserRecs] = useState([]);
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
          movies.push(movie);
        }
        setUserMovies(movies);
      };

      const loadRecs = async () => {
        const movies = [];
        const recs = await movieService.getRecommendations();
        for (const { tmdb_id } of recs) {
          const movie = await movieService.getMovieById(tmdb_id);
          movies.push(movie);
        }
        setUserRecs(movies);
      };

      await loadMovies();
      await loadRecs();
    };
    // render user's movies into usermovies and fetch poster data
    fetchUser();
  }, [setUser, setLoggedIn]);

  const removeMovie = (movie) => {
    const index = userMovies.indexOf(movie);
    const newMovies = [...userMovies];
    newMovies.splice(index, 1);
    setUserMovies(newMovies);
  };

  const saveMovies = async () => {
    const updatedUser = { ...user };

    updatedUser.movies = userMovies.map((movie) => {
      return { id: movie.id, title: movie.title };
    });
    console.log(updatedUser);
    setUser(updatedUser);
    const res = await userService.updateUser(updatedUser);
  };

  const addMovie = (movie) => {};

  return (
    <Box height={"100vh"} style={{ textAlign: "center" }}>
      {!isLoggedIn ? <LoginModal /> : <LogoutModal />}

      <Heading>WatchList</Heading>
      {isLoggedIn && (
        <>
          <Heading size="4xl">Your Movies</Heading>
          <Box mt={5} mr={10} ml={10}>
            <MovieList movies={userMovies} onPosterClicked={removeMovie} />
          </Box>
        </>
      )}

      {/* Add/Search Button */}
      <Flex flexDir={"column"} alignItems={"center"}>
        <IconButton
          m={4}
          aria-label="Add Movie"
          borderRadius={"full"}
          onClick={() => setSearchActive(!searchActive)}
          icon={<AddIcon />}
          colorScheme="blue"
        />
        <Button onClick={saveMovies}>Save</Button>
      </Flex>

      {/* Search Button */}
      <Box mb={10} mr={10} ml={10}>
        {searchActive && <SearchBar updateQuery={search} />}
        {/* Search Results */}
        {searchActive && query && (
          <SearchResults
            userMovies={userMovies}
            results={results}
            setMovies={setUserMovies}
          />
        )}
      </Box>

      {isLoggedIn && (
        <>
          <Heading>Recommendations</Heading>
          <Box mt={5} mr={10} ml={10} mb={10}>
            <MovieList movies={userRecs} onClick={addMovie} />
          </Box>
        </>
      )}
    </Box>
  );
}

export default App;

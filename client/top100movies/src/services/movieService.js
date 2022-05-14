import config from "../config.json";

const apiEndpoint = config.apiUrl + "/api/movies";

export async function searchMovies(query) {
  const moviesUrl = new URL(apiEndpoint);
  moviesUrl.searchParams.append("query", query);

  const results = await fetch(moviesUrl)
    .then((response) => response.json())
    .then((data) => data.results);
  return results;
}

export async function getMovieById(tmdbId) {
  const movieUrl = apiEndpoint + `/${tmdbId}`;

  const result = await fetch(movieUrl).then((response) => response.json());
  return result;
}

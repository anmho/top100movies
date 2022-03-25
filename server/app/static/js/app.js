console.log("success");

const base = "http://127.0.0.1:5000";
const search = document.querySelector("#search");

search.addEventListener("submit", async function (event) {
  event.preventDefault();
  const query = search.querySelector("#query").value;
  const movies = await fetchMovies(query);
  console.log(movies);
  renderMovies(movies);
});

async function fetchMovies(query) {
  const urlMovies = new URL("/movies", base);
  urlMovies.searchParams.append("query", query);
  let movies = fetch(urlMovies).then((res) => res.json());

  return movies;
}

function renderMovies(movies) {
  let moviesContainer = document.querySelector("#movies");

  let movieList = document.createElement("ol");
  movieList.id = "movies";
  moviesContainer.replaceChildren(movieList);

  movies.forEach((movie) => {
    let movieItem = document.createElement("li");
    movieItem.textContent = movie["title"];

    movieList.appendChild(movieItem);
  });
}

// console.log(query);
// // url.searchParams({query: ""}
// // movies = fetch("/movies", )

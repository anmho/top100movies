from . import api
from flask import jsonify, request
from app.config import TMDB_API_KEY
import requests
from app.api.recommender.recommender import Recommender


@api.route("/movies/", methods=["GET"])
def get_movies():
    query = request.args["query"]
    url = f"https://api.themoviedb.org/3/search/movie?api_key={TMDB_API_KEY}&language=en-US&query={query}&page=1&include_adult=false"

    response = requests.get(url)
    movies = jsonify(response.json())
    # can make so only some domains allowed
    # movies.headers.add("Access-Control-Allow-Origin", "*")

    return movies


@api.route("/movies/<int:movie_id>", methods=["GET"])
def get_movie(movie_id):
    url = f"https://api.themoviedb.org/3/movie/{movie_id}?api_key={TMDB_API_KEY}&language=en-US"
    response = requests.get(url).json()
    return response


@api.route("/movies/recommend", methods=["GET"])
def get_recommendations():
    data = request.get_json().get("liked_movies")
    liked_movies = []

    for liked_movie in data:
        movielens_id = Recommender.get_movie_id(liked_movie["tmdb_id"])
        rating = liked_movie["rating"]
        liked_movies.append((movielens_id, rating))

    recommendations = Recommender.get_recommendations(liked_movies)
    response = {
        "recommendations": recommendations
    }
    return response

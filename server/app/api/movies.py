from . import api
from flask import jsonify, request
from app.config import TMDB_API_KEY
import requests


@api.route("/movies/", methods=["GET"])
def get_movies():
    query = request.args["query"]
    response = requests.get(
        f"https://api.themoviedb.org/3/search/movie?api_key={TMDB_API_KEY}&language=en-US&query={query}&page=1&include_adult=false")
    movies = jsonify(response.json())
    movies.headers.add("Access-Control-Allow-Origin", "*")

    return movies




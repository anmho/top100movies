from flask import Blueprint, request, render_template, jsonify, Response
from .config import TMDB_API_KEY
import requests

api = Blueprint("api", __name__)


@api.route("/", methods=["GET"])
def home():
    return render_template("index.html")


@api.route("/movies/", methods=["GET"])
def movies():
    query = request.args["query"]
    response = requests.get(
        f"https://api.themoviedb.org/3/search/movie?api_key={TMDB_API_KEY}&language=en-US&query={query}&page=1&include_adult=false")
    movies = jsonify(response.json())
    movies.headers.add("Access-Control-Allow-Origin", "*")
    # response = jsonify({"members": ["1", "2", "3"]})
    # movies.headers.add('Access-Control-Allow-Origin', '*')
    # movies.headers.add('Access-Control-Allow-Methods', '*')
    # movies.headers.add("Access-Control-Allow-Headers", "Content-Type")
    # return response
    return movies

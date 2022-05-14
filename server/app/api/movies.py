from lib2to3.pgen2 import token
from . import api
from flask import jsonify, request
from app.config import TMDB_API_KEY
import requests
from app.api.recommender.recommender import Recommender
from app.api.errors import bad_request
from app.api.auth import token_auth


@api.route("/movies/", methods=["GET"])
def get_movies():
    query = request.args["query"]
    url = f"https://api.themoviedb.org/3/search/movie?api_key={TMDB_API_KEY}&language=en-US&query={query}&page=1&include_adult=false"

    response = requests.get(url)
    movies = jsonify(response.json())
    # can make so only some domains allowed

    return movies


@api.route("/movies/<int:movie_id>", methods=["GET"])
def get_movie(movie_id):
    url = f"https://api.themoviedb.org/3/movie/{movie_id}?api_key={TMDB_API_KEY}&language=en-US"
    response = requests.get(url).json()
    return response


@api.route("/movies/recommendations", methods=["GET"])
@token_auth.login_required
def get_recommendations():
    movies = token_auth.current_user().movies
    ratings = [[movie.id, 5] for movie in movies]  # Default 5 rating

    for movie_rating in ratings:
        tmdb_id, rating = movie_rating
        movielens_id = Recommender.get_movie_id(tmdb_id=tmdb_id)
        if not movielens_id:
            continue

        movie_rating[0] = movielens_id

    recommendations = Recommender.get_recommendations(ratings)
    response = {
        "recommendations": recommendations
    }
    return response

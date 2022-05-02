
from pprint import pprint
import pandas as pd
import joblib
import math


class Recommender():
    _rec_matrix = joblib.load(
        "/Users/andrewho/repos/top100movies/server/app/api/recommender/rec_matrix")
    _links = pd.read_csv(
        "/Users/andrewho/repos/top100movies/server/app/api/recommender/datasets/links.csv")
    _movies = pd.read_csv(
        "/Users/andrewho/repos/top100movies/server/app/api/recommender/datasets/movies.csv")

    @classmethod
    def get_tmdb_id(cls, movielens_id):
        id_row = cls._links.loc[cls._links["movieId"] == movielens_id]
        tmdb_id = id_row["tmdbId"].values[0]
        return tmdb_id

    @classmethod
    def get_movie_id(cls, tmdb_id):
        id_row = cls._links.loc[cls._links["tmdbId"] == tmdb_id]
        movie_id = id_row["movieId"].values[0]

        return movie_id

    @classmethod
    def get_similar_movies(cls, movie_name, user_rating):
        similarity_scores = cls._rec_matrix[movie_name] * (user_rating - 2.5)
        similarity_scores = similarity_scores.sort_values(ascending=False)
        return similarity_scores

    @classmethod
    def get_recommendations(cls, movie_ratings, amount=20):
        similar_movies = pd.DataFrame()
        for movie, rating in movie_ratings:
            similar_movies = similar_movies.append(
                cls.get_similar_movies(movie, rating), ignore_index=True)

        recommendations = list(
            similar_movies.sum()
            .sort_values(ascending=False)
            .head(min(amount, 50))
            .keys()
        )

        if recommendations and recommendations[0] in [rating[0] for rating in movie_ratings]:
            recommendations.pop(0)

        # remove same movie if present
        for i, movie_id in enumerate(recommendations):
            tmdb_id = cls.get_tmdb_id(movie_id)

            title = cls._movies.loc[cls._movies["movieId"] ==
                                    movie_id]["title"].values[0]
            # print(title)
            if tmdb_id and not math.isnan(tmdb_id):
                tmdb_id = int(tmdb_id)
            # recommendations[i] = (movie_id, tmdb_id)
            recommendations[i] = {
                "tmdb_id": tmdb_id,
                "title": title
            }

        for i, recommendation in enumerate(recommendations):
            if recommendation["tmdb_id"] and math.isnan(recommendation["tmdb_id"]):
                recommendations.pop(i) # alters list

        return recommendations


def main():
    action_lover = [(1, 1), (2, 5)]  # toy story and jumanji
    recommendations = Recommender.get_recommendations(action_lover)
    Recommender.get_movie_id()
    pprint(recommendations)


if __name__ == "__main__":
    main()

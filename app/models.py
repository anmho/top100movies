from shutil import unregister_unpack_format
from flask_sqlalchemy import SQLAlchemy, BaseQuery
from werkzeug.security import check_password_hash, generate_password_hash
import base64
from flask import url_for
from datetime import datetime, timedelta
import os
# from __future__ import annotations

db = SQLAlchemy()

# No unique objects, store relationships between movies and users
user_movie = db.Table("user_movie",
                      db.Column("user_id", db.Integer,
                                db.ForeignKey("user.id")),
                      db.Column("movie_id", db.Integer,
                                db.ForeignKey("movie.id"))
                      )
# ratings-movie relationship


class PaginatedAPIMixin():
    @staticmethod
    def to_collection_dict(query: BaseQuery, page: int, per_page: int, endpoint: str, **kwargs):
        resources = query.paginate(
            page=page, per_page=per_page, error_out=False)

        data = {
            "items": [item.to_dict() for item in resources.items],
            "_meta": {
                "page": page,
                "per_page": per_page,
                "total_pages": resources.pages,
                "total_items": resources.total,
            },
            "_links": {
                "self": url_for(endpoint, page=page, per_page=per_page, **kwargs),
                "next": url_for(endpoint, page=page+1, per_page=per_page, **kwargs) if resources.has_next else None,
                "prev": url_for(endpoint, page=page-1, per_page=per_page, **kwargs) if resources.has_prev else None,
            }
        }
        return data


class Movie(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(50))

    def to_dict(self):
        data = {
            "id": self.id,
            "title": self.title,
        }
        return data

    def from_dict(self, data: dict):
        if "id" in data and "title" in data:
            self.id = data["id"]
            self.title = data["title"]

    def __repr__(self):
        return f"<Movie {self.title}>"


class User(db.Model, PaginatedAPIMixin):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(20), unique=True)
    email = db.Column(db.String(100), unique=True)
    movies = db.relationship("Movie", secondary="user_movie", backref="users")
    pw_hash = db.Column(db.String(64))
    token = db.Column(db.String(32), index=True, unique=True)
    token_expiration = db.Column(db.DateTime())

    def set_password(self, password: str) -> None:
        self.pw_hash = generate_password_hash(
            password, method="sha256", salt_length=16)

    def check_password(self, password: str) -> bool:
        return check_password_hash(pwhash=self.pw_hash, password=password)

    def get_token(self, expires_in=3600) -> str:
        now = datetime.utcnow()
        # check if token exists and is unexpired
        if self.token and self.token_expiration > now + timedelta(seconds=60):
            return self.token

        # generate new token
        self.token = base64.b64encode(os.urandom(24)).decode("utf-8")
        self.token_expiration = now + timedelta(seconds=expires_in)
        db.session.add(self)
        return self.token

    @staticmethod
    def check_token(token: str) -> 'User':
        # check user has token
        user = User.query.filter_by(token=token).first()

        # check if token is expired
        if user is None or user.token_expiration < datetime.utcnow():
            return None  # no user with this token

        return user

    def revoke_token(self) -> None:
        now = datetime.utcnow()
        self.token_expiration = now - timedelta(seconds=1)

    def to_dict(self):
        data = {
            "id": self.id,
            "username": self.username,
            "movies": [movie.to_dict() for movie in self.movies],
        }
        return data

    def from_dict(self, data: dict, new_user=False) -> None:
        # set all the fields to the corresponding json
        fields = ["username", "email"]
        for field in fields:
            if field in data:
                setattr(self, field, data[field])

        if "movies" in data:
            """
            "movies: [
                { "tmdb_id": 1, "title": Spiderman },
                {},
                {},
            ]
            """
            new_movies = []
            for movie_data in data["movies"]:
                if "id" in movie_data and "title" in movie_data:
                    tmdb_id = movie_data["id"]
                    movie = Movie.query.filter_by(id=tmdb_id).first()
                    if movie is None:
                        movie = Movie()
                        movie.from_dict(movie_data)

                    new_movies.append(movie)
            self.movies = new_movies

        # set password
        if new_user and "password" in data:
            self.set_password(data["password"])

    def __repr__(self):
        return f"<User {self.username}>"

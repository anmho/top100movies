from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import check_password_hash, generate_password_hash


db = SQLAlchemy()

# table but do not want it to map to any objects, simply store relationships between movies and users
user_movie = db.Table("user_movie",
                      db.Column("user_id", db.Integer,
                                db.ForeignKey("user.id")),
                      db.Column("movie_id", db.Integer,
                                db.ForeignKey("movie.id"))
                      )


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(20), unique=True)
    email = db.Column(db.String(100), unique=True)
    movies = db.relationship("Movie", secondary="user_movie", backref="users")
    pw_hash = db.Column(db.String(64))

    def set_password(self, password):
        self.password = generate_password_hash(
            password, method="sha256", salt_length=16)

    def check_password(self, password):
        return check_password_hash(pwhash=self.pw_hash, password=password)

    # tokens
    def get_token(self):
        pass

    def check_token(self):
        pass

    def to_dict(self):
        data = {
            "id": self.id,
            "username": self.username,
            "movies": [movie.to_dict() for movie in self.movies],
        }
        return data

    def from_dict(self, data, new_user=False):
        # set all the fields to the corresponding json
        fields = ["username", "email"]
        for field in fields:
            if field in data:
                setattr(self, field, data[field])
        
        # set password
        if new_user and "password" in data:
            self.set_password(data["password"])

    def __repr__(self):
        return f"<User {self.username}>"


class Movie(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(50))
    # to_dict
    def to_dict(self):
        data = {
            "id": self.id,
            "title": self.title,
        }
        return data

    def __repr__(self):
        return f"<Movie {self.title}>"

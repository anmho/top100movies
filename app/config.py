
import os

# CONFIG
SECRET_KEY = os.environ.get("SECRET_KEY")
SQLALCHEMY_DATABASE_URI = os.environ.get("SQLALCHEMY_DATABASE_URI")
# SQLALCHEMY_DATABASE_URI = "postgresql://postgres@localhost/test"
# SQLALCHEMY_TRACK_MODIFICATIONS = False

# API KEYS
TMDB_API_KEY = os.environ.get("TMDB_API_KEY")

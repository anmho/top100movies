from flask_migrate import Migrate
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from os import path
from .api import api
from .models import db

from app.models import User, Movie
from flask_cors import CORS


def create_app():
    app = Flask(__name__)
    # Configure settings
    app.config.from_pyfile("config.py")

    # Register Blueprints
    app.register_blueprint(api, url_prefix="/api")

    # Bind packages to Flask app
    cors = CORS()
    # cors.init_app(app=app, origins=["http://localhost:3000/"])
    cors.init_app(app=app, origins=["*"])
    db.init_app(app)
    # register extensions
    migrate = Migrate(app, db)
    # create_database(app)
    db.create_all(app=app)
    return app


# def create_database(app):
#     if not path.exists(DB_NAME):
#         db.create_all(app=app)

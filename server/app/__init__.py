from flask import Flask
from .api import api
from .auth import auth
from .models import db


def create_app():
    app = Flask(__name__)
    # Configure settings
    app.config.from_pyfile("config.py")

    # db.init_app(app, url_prefix="/")

    # Register Blueprints
    app.register_blueprint(api, url_prefix="/api")
    app.register_blueprint(auth)

    # Bind packages to Flask app\
    return app


def create_database():
    pass

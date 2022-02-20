from flask import Flask
from .views import views
from .models import db


def create_app():
    app = Flask(__name__)
    # Configure settings
    app.config.from_pyfile("config.py")

    # db.init_app(app, url_prefix="/")

    # Register Blueprints
    app.register_blueprint(views)

    # Bind packages to Flask app\
    return app

from flask import Blueprint

views = Blueprint("/", __name__)


@views.route("/")
def home():
    return "Hello World"

from flask import Blueprint, render_template

auth = Blueprint("auth", __name__)


@auth.route("/sign-up", methods=["POST"])
def sign_up():

    return "hello"

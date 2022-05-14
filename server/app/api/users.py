from . import api
from app.models import User, db
from flask import request, jsonify
from app.api.tokens import basic_auth, token_auth
from app.api.errors import error_response, bad_request


@api.route("/users/<username>", methods=["GET"])
@token_auth.login_required
def get_user(username):
    user = User.query.filter_by(username=username).first()
    return user.to_dict()


@api.route("/users", methods=["GET"])
@token_auth.login_required
def get_users():
    page = request.args.get("page", 1, type=int)
    per_page = request.args.get("per_page", 20, type=int)

<<<<<<< HEAD
    data = User.to_collection_dict(
=======
    users = User.to_collection_dict(
>>>>>>> tmp
        User.query,
        page=page,
        per_page=min(per_page, 100),
        endpoint="api.get_users"
    )

<<<<<<< HEAD
    return data
=======
    return users
>>>>>>> tmp


@api.route("/users", methods=["POST"])
def create_user():
    data = request.get_json() or {}
    # Check for username, email, and password
    if "username" not in data or "email" not in data or "password" not in data:
        return bad_request("must include username, email, and password fields")
    # user already exists
    if User.query.filter_by(username=data["username"]).first():
        return bad_request("username already in use")

    # email already in use
    if User.query.filter_by(email=data["email"]).first():
        return bad_request("email already in use")

    # Make new user
    user = User()
    user.from_dict(data, new_user=True)
    db.session.add(user)
    db.session.commit()

    # Return created user
    response = jsonify(user.to_dict())
    response.status_code = 201
    return response


@api.route("/users/<username>", methods=["PUT"])
@token_auth.login_required
def update_user(username):
    data = request.get_json()

    user = User.query.filter_by(username=username).first()
    user.from_dict(data)

    db.session.commit()

    response = jsonify(user.to_dict())
    response.status_code = 200

    return response


@api.route("/users/<username>", methods=["DELETE"])
@token_auth.login_required
def delete_user(username):
    user = User.query.filter_by(username=username)
    if not user or token_auth.current_user().username != username:
        return bad_request("invalid user")

    user.delete()
    db.session.commit()
    return {}, 204


@api.route("/users/<username>/ratings", methods=["GET"])
def get_ratings(username):
    pass

@api.route("/users/<username>/ratings", methods=["GET"])
def get_ratings(username):
    pass
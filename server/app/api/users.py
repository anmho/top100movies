from . import api
from app.models import User, db
from flask import request, jsonify


@api.route("/users/<username>", methods=["GET"])
def get_user(username):
    user = User.query.filter_by(username=username).first()
    return user.to_dict()


@api.route("/users", methods=["GET"])
def get_users():
    users = User.query.all()
    users = [user.to_dict() for user in users]
    response = {
        "users": users
    }

    return response


@api.route("/users", methods=["POST"])
def create_user():
    data = request.get_json() or {}
    # has necessary data
    if "username" not in data or "email" not in data or "password" not in data:
        return "error"
    # user already exists
    # email already in use

    user = User()
    user.from_dict(data)
    db.session.add(user)
    db.session.commit()

    response = jsonify(user.to_dict())
    response.status_code = 201
    return response


@api.route("/users/<username>", methods=["PUT"])
def update_user(username):
    data = request.get_json()

    user = User.query.filter_by(username=username).first()
    user.from_dict(data)

    db.session.commit()

    response = jsonify(user.to_dict())
    response.status_code = 200

    return response


@api.route("/users/<username>", methods=["DELETE"])
def delete_user(username):
    pass

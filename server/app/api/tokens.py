from distutils.log import error
from app.models import User
from flask_httpauth import HTTPBasicAuth, HTTPTokenAuth
from .errors import error_response

basic_auth = HTTPBasicAuth()
token_auth = HTTPTokenAuth()


@basic_auth.verify_password
def verify_password(username, password):
    user = User.query.filter_by(username=username).first()
    if user.check_password(password):
        return user

    return None


@basic_auth.error_handler
def basic_error_handler(status):
    return error_response(status)


@token_auth.verify_token
def verify_token(token):
    # No Token
    if not token:
        return None
    # Check if token is valid
    return User.check_token(token)


@token_auth.error_handler
def token_error_handler(status):
    return error_response(status)

from src.sec.JwtAuth import JwtAuth,JwtAuthMsg
from src.sec.Authenticator import Authenticator
from functools import wraps
from flask import request

class InternalAPIError(Exception):

  def __init__(self, message, returnCode, custom_header=None):
    self.msg = message
    self.rCode = returnCode
    self.custom_header = custom_header

    self.raise_error()

  def raise_error(self):
    return {"message": self.msg, "ok": False}, self.rCode, self.custom_header

def AuthenticationRequired():
  api_error = InternalAPIError(
    message=f"User must authenticate!",
    returnCode=401,
    custom_header={"WWW-Authenticate": "Digest realm=\"access to core app\""}
  )

  return api_error.raise_error()

def basicauthenticate(api):
  @wraps(api)
  def auth(*args, **kwargs):
    try:
      data = request.authorization
      if data is None or not Authenticator.basic_user_auth(
              data.username,
              data.password
      ):
        return AuthenticationRequired()
      return api(*args, **kwargs)
    except Exception as e:
      return {"message": "internal server error"}, 500

  return auth

def httpauthenticate(api):
  @wraps(api)
  def auth(*args, **kwargs):
    try:
      jtoken: JwtAuthMsg = JwtAuth.decode_auth_token(request.headers.get('X-Authentication'))
      if jtoken.authd is False:
        return AuthenticationRequired()
      return api(*args, **kwargs)
    except Exception as e:
      return {"message": "internal server error"}, 500

  return auth
# curl localhost/test_jwt -X POST -H 'X-Authentication: token'

from flask import Flask

from src.util.LogFactory import LogFactory
from src.WebServer.WebServerInit import WebServerInit
from src.WebServer.decorators.HTTPLogger import http_logger
from src.WebServer.decorators.ApiAuth import httpauthenticate

flask_ref: Flask = WebServerInit.flask

class TestJwtToken:

  def __init__(self):
    LogFactory.MAIN_LOG.info('Start TestJwtToken Controller')

  @staticmethod
  @flask_ref.route('/test_jwt', methods=['POST'])
  @http_logger
  @httpauthenticate
  def test_jwt():
    LogFactory.MAIN_LOG.info("Attempting jwt token")
    return {"message" : "auth'd"}, 200
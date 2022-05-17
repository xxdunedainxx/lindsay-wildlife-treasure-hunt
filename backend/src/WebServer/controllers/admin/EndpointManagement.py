# curl localhost/test_jwt -X POST -H 'X-Authentication: token'

from flask import Flask

from src.util.LogFactory import LogFactory
from src.WebServer.WebServerInit import WebServerInit
from src.WebServer.decorators.HTTPLogger import http_logger
from src.WebServer.decorators.ApiAuth import basicauthenticate
from src.admin.AdminDB import ADMIN_DB

flask_ref: Flask = WebServerInit.flask

class EndpointManagerController:

  def __init__(self):
    LogFactory.MAIN_LOG.info('Start endpoint manager')

  @staticmethod
  @flask_ref.route('/endpoint_state/<string:endpoint_id>', methods=['GET'])
  @http_logger
  # Can use service account for endpoint auth
  @basicauthenticate
  def get_endpoint_state(endpoint_id: str):
    LogFactory.MAIN_LOG.info("Attempting to get endpoint state")

    if endpoint_id not in ADMIN_DB.WALLBOARD_CONFIGS.keys():
      return {"message" : "not found"}, 404
    else:
      return ADMIN_DB.WALLBOARD_CONFIGS[endpoint_id], 200

  @staticmethod
  @flask_ref.route('/endpoint_url/<string:endpoint_id>', methods=['GET'])
  @http_logger
  @basicauthenticate
  def get_endpoint_url(endpoint_id: str):
    try:
      LogFactory.MAIN_LOG.info("Attempting to get endpoint url")

      if endpoint_id not in ADMIN_DB.WALLBOARD_CONFIGS.keys():
        return {"message" : "not found"}, 404
      else:
        return ADMIN_DB.WALLBOARD_CONFIGS[endpoint_id]["url"], 200
    except Exception as e:
      return {"message" : "oh no"},500

  # TODO: report metrics for endpoint
  # @staticmethod
  # @flask_ref.route('/endpoint_state/<string:endpoint_id>/report', methods=['POST'])
  # @http_logger
  # def report_endpoint_state(endpoint_id: str):
  #   LogFactory.MAIN_LOG.info("Attempting to get endpoint state")
  #   return {"message" : "auth'd"}, 200
# curl localhost/wallboards -X GET -H 'X-Authentication: '
# curl localhost/wallboards -X POST -d '{"name" :"test", "description": "a test", "url" : "http://localhost"}' -H 'Content-Type: application/json' -H 'X-Authentication: '
# curl localhost/wallboards/test -X DELETE -H 'X-Authentication: '

from flask import Flask, request

from src.util.LogFactory import LogFactory
from src.util.ErrorFactory import errorStackTrace
from src.WebServer.WebServerInit import WebServerInit
from src.WebServer.decorators.HTTPLogger import http_logger
from src.WebServer.decorators.ApiAuth import httpauthenticate
from src.admin.AdminDB import ADMIN_DB

flask_ref: Flask = WebServerInit.flask

class WallboardManagementController:

  def __init__(self):
    LogFactory.MAIN_LOG.info('Start Wallboard management Controller')

  # @staticmethod
  # def __validate_wallboard_profile_specifics(payload: dict):
  #   if "profile" not in payload.keys():
  #     return False
  #   elif payload["profile"] == 

  @staticmethod
  def __validate_wallboard_payload(payload: dict):
    return "name" in payload.keys() and \
           "description" in payload.keys() and \
           "url" in payload.keys()

  @staticmethod
  @flask_ref.route('/wallboards', methods=['GET'])
  @http_logger
  @httpauthenticate
  def get_wallboards():
    LogFactory.MAIN_LOG.info("Getting Wallboards")
    return ADMIN_DB.WALLBOARD_CONFIGS, 200

  @staticmethod
  @flask_ref.route('/wallboards/<string:wallboard_id>', methods=['GET'])
  @http_logger
  @httpauthenticate
  def get_wallboard(wallboard_id: str):
    LogFactory.MAIN_LOG.info("Getting Wallboards")
    if wallboard_id in ADMIN_DB.WALLBOARD_CONFIGS.keys():
      return ADMIN_DB.WALLBOARD_CONFIGS[wallboard_id], 200
    else:
      return {"message" : "not found"}, 404


  @staticmethod
  @flask_ref.route('/wallboards', methods=['POST'])
  @http_logger
  @httpauthenticate
  def create_wallboard():
    LogFactory.MAIN_LOG.info("Creating Wallboard")
    try:
      data = request.get_json()
      if data == None or WallboardManagementController.__validate_wallboard_payload(data) == False:
        return {"message" : "bad request"}, 400

      if data["name"] not in ADMIN_DB.WALLBOARD_CONFIGS.keys():
        ADMIN_DB.WALLBOARD_CONFIGS[data["name"]] = {
          "description" : data["description"],
          "url" : data["url"]
        }
        ADMIN_DB.rewrite_db()
        return {"message" : "ok"}, 200
      else:
        return {"message" : "record already exists"}, 400
    except Exception as e:
      LogFactory.MAIN_LOG.error(f"Failed to create wallboard record: {errorStackTrace(e)}")
      return {"message" : "something bad happenend"}, 500

  @staticmethod
  @flask_ref.route('/wallboards/<string:wallboard_id>', methods=['DELETE'])
  @http_logger
  @httpauthenticate
  def delete_wallboard(wallboard_id: str):
    LogFactory.MAIN_LOG.info("Deleting Wallboard")
    try:
      if wallboard_id in ADMIN_DB.WALLBOARD_CONFIGS.keys():
        del ADMIN_DB.WALLBOARD_CONFIGS[wallboard_id]
        ADMIN_DB.rewrite_db()
        return {"message" : "ok"}, 200
      else:
        return {"message": "not found"}, 404
    except Exception as e:
      LogFactory.MAIN_LOG.error(f"Failed to create wallboard record: {errorStackTrace(e)}")
      return {"message" : "something bad happenend"}, 500

  @staticmethod
  @flask_ref.route('/wallboards/<string:wallboard_id>', methods=['PUT'])
  @http_logger
  @httpauthenticate
  def update_wallboard(wallboard_id: str):
    LogFactory.MAIN_LOG.info("Patching Wallboard")
    try:
      data = request.get_json()
      if data == None or WallboardManagementController.__validate_wallboard_payload(data) == False:
        return {"message": "bad request"}, 400

      if wallboard_id in ADMIN_DB.WALLBOARD_CONFIGS.keys():
        ADMIN_DB.WALLBOARD_CONFIGS[data["name"]] = {
          "description": data["description"],
          "url": data["url"]
        }
        ADMIN_DB.rewrite_db()
        return {"message" : "ok"}, 200
      else:
        return {"message": "not found"}, 404
    except Exception as e:
      LogFactory.MAIN_LOG.error(f"Failed to update wallboard record: {errorStackTrace(e)}")
      return {"message" : "something bad happenend"}, 500

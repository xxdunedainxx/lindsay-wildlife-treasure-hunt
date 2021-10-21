from src.util.LogFactory import LogFactory
from src.WebServer.decorators.HTTPLogger import http_logger
from src.WebServer.WebServerInit import WebServerInit
from src.util.ErrorFactory import errorStackTrace
from src.UILogging.UILogQueue import UILogQueue
from src.Singletons import Singletons

from flask import Flask, jsonify, request

flask_ref: Flask = WebServerInit.flask

class UILogsController:

  def __init__(self):
    LogFactory.MAIN_LOG.info('Start UILogsController')

  EXAMPLE_PAYLOAD: dict = {
    "logData" : "",
    "sessionID" : "",
    "deviceInfo" : "",
    "version" : ""
  }

  @staticmethod
  def __valid_post_payload(request) -> bool:
    for payloadData in UILogsController.EXAMPLE_PAYLOAD.keys():
      if payloadData not in request.json.keys():
        return False
    return True

  @staticmethod
  @flask_ref.route('/uilogs', methods=['GET'])
  @http_logger
  def ui_logs_enabled():
    try:
      LogFactory.MAIN_LOG.info("uilogs api")

      return {
        "enabled": True,
      }
    except Exception as e:
      LogFactory.MAIN_LOG.error(f"Failed Fetching uilogs api {errorStackTrace(e)}")
      return {
        "enabled" : False
      }, 500

  @staticmethod
  @flask_ref.route('/quilogs', methods=['POST'])
  @http_logger
  def queue_ui_log():
    try:
      if request.json == None or UILogsController.__valid_post_payload(request) == False:
        return {
          "response" : "Invalid body provided"
        }, 400

      uiQ: UILogQueue = Singletons.uiLogQ

      uiQ.add_to_q(request.json)

      LogFactory.MAIN_LOG.info("POST uilogs api")
      return {
        "enabled": True,
        "response": "success"
      }
    except Exception as e:
      LogFactory.MAIN_LOG.error(f"Failed Fetching uilogs api {errorStackTrace(e)}")
      return {
        "enabled" : False,
        "response": "failed :("
      }, 500
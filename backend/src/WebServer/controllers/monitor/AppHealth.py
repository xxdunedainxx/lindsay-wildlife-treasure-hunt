from src.util.LogFactory import LogFactory
from src.Configuration import CONF_INSTANCE
from src.WebServer.decorators.HTTPLogger import http_logger
from src.WebServer.WebServerInit import WebServerInit
from src.util.ErrorFactory import errorStackTrace

from flask import Flask, jsonify, request
from src.WebServer.controllers.monitor.AppHealthStatuses import AppHealthStatus
from src.WebServer.controllers.monitor.AppHealthUtil import AppHealthStatusUtil

flask_ref: Flask = WebServerInit.flask

class AppHealthController:


  def __init__(self):
    LogFactory.MAIN_LOG.info('Start AppHealthController')

  @staticmethod
  @flask_ref.route('/health', methods=['GET'])
  @http_logger
  def app_health():
    try:
      LogFactory.MAIN_LOG.info("Fetching app health")
      return {
        "status" : AppHealthStatusUtil.determine_health_status()
      }
    except Exception as e:
      LogFactory.MAIN_LOG.error(f"Failed Fetching app health {errorStackTrace(e)}")
      return {
        "status" : AppHealthStatus.FATAL
      }, 500

  @staticmethod
  @flask_ref.route('/dependencies', methods=['GET'])
  @http_logger
  def dependencies():
    try:
      LogFactory.MAIN_LOG.info("Fetching app dependencies")
      return {
        "dependencies": AppHealthStatusUtil.get_enabled_services()
      }
    except Exception as e:
      LogFactory.MAIN_LOG.error(f"Failed fetching db {errorStackTrace(e)}")
      return {
               "status": AppHealthStatus.UNKNOWN
             }, 500

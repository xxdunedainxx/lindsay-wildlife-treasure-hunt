from src.util.LogFactory import LogFactory
from src.WebServer.decorators.HTTPLogger import http_logger
from src.WebServer.WebServerInit import WebServerInit
from src.util.ErrorFactory import errorStackTrace
from src.data.db_client.DBClient import DBClient
from src.Singletons import Singletons

from flask import Flask, request

flask_ref: Flask = WebServerInit.flask

class ScavengerHuntController:

  def __init__(self):
    LogFactory.MAIN_LOG.info('Start ScavengerHuntController')

  @staticmethod
  @flask_ref.route('/scavenger_hunt', methods=['GET'])
  @http_logger
  def get_scavenger_hunt_db():
    try:
      LogFactory.MAIN_LOG.info("scavenger hunt get api")
      dbConnection: DBClient = Singletons.db

      return dbConnection.get_items()
    except Exception as e:
      LogFactory.MAIN_LOG.error(f"Failed Fetching scavenger hunt db {errorStackTrace(e)}")
      return {
               "response": "scavenger hunt api failure"
             }, 500
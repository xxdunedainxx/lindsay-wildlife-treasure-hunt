# curl -F 'file=@/Users/zach.mcfadden/Documents/projects/side_stuff/lindsay-wildlife/lindsay-wildlife-treasure-hunt/backend/assets/0.png' http://localhost/files/upload   -X POST -H 'X-Authentication: '

from flask import Flask, request, send_from_directory
import os

from src.util.LogFactory import LogFactory
from src.util.ErrorFactory import errorStackTrace
from src.WebServer.WebServerInit import WebServerInit
from src.WebServer.decorators.HTTPLogger import http_logger
from src.WebServer.decorators.ApiAuth import httpauthenticate
from src.util.FileIO import FileIO
from src.Configuration import CONF_INSTANCE

flask_ref: Flask = WebServerInit.flask

class FileServer:

  def __init__(self):
    LogFactory.MAIN_LOG.info('Start FileServer Controller')
    FileIO.create_directory_if_does_not_exist(CONF_INSTANCE.FILE_SERVER_DIR)

  @staticmethod
  @flask_ref.route('/files/upload', methods=['POST'])
  @http_logger
  @httpauthenticate
  def upload():
    LogFactory.MAIN_LOG.info("Attempting to upload the file")
    try:
      if 'file' in request.files:
        file = request.files['file']
        file.save(f"{CONF_INSTANCE.FILE_SERVER_DIR}{os.sep}{file.filename}")
        return {"message": "success, uploaded"}, 200
      else:
        return {"message" : "bad request"},400
    except Exception as e:
      LogFactory.MAIN_LOG.error(f"Failed to upload {errorStackTrace(e)}")
      return {"message" : "uh oh"}, 500

  @staticmethod
  @flask_ref.route('/files/list', methods=['GET'])
  @http_logger
  @httpauthenticate
  def list_files():
    LogFactory.MAIN_LOG.info("Attempting to get the file names")
    try:
      names: [str] = FileIO.get_files_in_directory(CONF_INSTANCE.FILE_SERVER_DIR)

      return {"message": "ok", "names" : names}, 200

    except Exception as e:
      LogFactory.MAIN_LOG.error(f"Failed to upload {errorStackTrace(e)}")
      return {"message" : "uh oh"}, 500

  @staticmethod
  @flask_ref.route('/files/get_file/<path:file_name>', methods=['GET'])
  @http_logger
  def get_file(file_name):
    try:
      return send_from_directory(CONF_INSTANCE.FILE_SERVER_DIR, file_name)
    except FileNotFoundError:
      return {"message": "File can't be found"}, 404
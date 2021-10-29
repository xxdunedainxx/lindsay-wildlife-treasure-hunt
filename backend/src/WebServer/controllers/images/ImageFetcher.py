from src.WebServer.WebServerInit import WebServerInit
from src.WebServer.decorators.HTTPLogger import http_logger
from src.Configuration import Configuration, CONF_INSTANCE

from flask import Flask, request, send_from_directory, abort
flask_ref: Flask = WebServerInit.flask

class RenderHTML:

  @staticmethod
  @flask_ref.route('/get-image/<id:image_name>')
  @http_logger
  def get_image(image_name):
    try:
      return send_from_directory(CONF_INSTANCE.IMAGE_DIR, image_name)
    except FileNotFoundError:
      abort(404)
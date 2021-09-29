from src.util.LogFactory import LogFactory
from src.Configuration import CONF_INSTANCE

from flask import Flask, render_template, jsonify
from flask_cors import CORS

class WebServerInit:

  flask: Flask = Flask(__name__)

  def __init__(self):
    pass

  @staticmethod
  def init_flask():
    LogFactory.MAIN_LOG.info('Start flask API')
    CORS(WebServerInit.flask)

  @staticmethod
  def configure_cors():
    pass


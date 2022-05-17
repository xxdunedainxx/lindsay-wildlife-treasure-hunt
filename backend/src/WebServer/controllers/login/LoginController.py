# curl localhost/login -X POST -d '{"username":"admin","password":"bad"}' -H 'Content-Type: application/json'

from flask import Flask, render_template, jsonify

from src.util.LogFactory import LogFactory
from src.sec.Authenticator import Authenticator
from src.WebServer.WebServerInit import WebServerInit
from src.WebServer.decorators.HTTPLogger import http_logger
from src.sec.JwtAuth import JwtAuth

from flask import request

flask_ref: Flask = WebServerInit.flask

class LoginController:

  def __init__(self):
    LogFactory.MAIN_LOG.info('Start LoginController')

  @staticmethod
  @flask_ref.route('/login', methods=['POST'])
  @http_logger
  def login():
    LogFactory.MAIN_LOG.info("Attempting login")
    data = request.get_json()

    if data == None:
      return jsonify({'message': 'bad request'}), 400

    if 'username' in data.keys() and 'password' in data.keys():
      if Authenticator.basic_user_auth(
        data['username'],
        data['password']
      ):
        return jsonify({'message': 'authorized', 'jwt': JwtAuth.encode_auth_token()})
      else:
        return jsonify({'message': 'unauthorized'}), 401
    else:
      return jsonify({'message': 'bad request'}), 400
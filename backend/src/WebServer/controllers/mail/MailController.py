from src.util.LogFactory import LogFactory
from src.WebServer.decorators.HTTPLogger import http_logger
from src.WebServer.WebServerInit import WebServerInit
from src.util.ErrorFactory import errorStackTrace
from src.Singletons import Singletons
from src.util.validators.EmailValidator import EmailValidator

from flask import Flask, request

flask_ref: Flask = WebServerInit.flask

class MailController:

  def __init__(self):
    LogFactory.MAIN_LOG.info('Start MailController')

  @staticmethod
  @flask_ref.route('/mail', methods=['POST'])
  @http_logger
  def mail_api():
    try:
      if request.json == None:
        return {
          "response" : "no payload provided"
        }, 400

      LogFactory.MAIN_LOG.info(f"args {request.json}")
      LogFactory.MAIN_LOG.info("mail api")
      if "email" not in request.json:
        return {
          "response": "no email provided"
        }, 400
      email = request.json['email']
      
      if EmailValidator.is_valid(email):
        mail_q = Singletons.mailQ
        email_json = {
                "email" : email
            }
        # pass the key in the response
        key = mail_q.add_to_q(email_json)
        return {
          "response" : "valid email",
          "key" : key
        }
      else:
        return {
          "response" : "invalid email"
        }, 400
    except Exception as e:
      LogFactory.MAIN_LOG.error(f"Failed Fetching mail api {errorStackTrace(e)}")
      return {
        "response" : "email api failure"
      }, 500
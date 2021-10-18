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
  def __valid_post_payload(request) -> bool:
    return "email" not in request.json or "username" not in request.json

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
      if MailController.__valid_post_payload(request=request):
        return {
          "response": "no email provided, or no username provided"
        }, 400
      email = request.json['email']
      username = request.json['username']
      
      if EmailValidator.is_valid(email):
        mail_q = Singletons.mailQ
        email_json = {
          "email" : email,
          "username" : username
        }
        # pass the key in the response
        key = mail_q.add_to_q(email_json)
        return {
          "response" : "Valid Request",
          "key" : key
        }
      else:
        return {
          "response" : "Invalid Request"
        }, 400
    except Exception as e:
      LogFactory.MAIN_LOG.error(f"Failed Fetching mail api {errorStackTrace(e)}")
      return {
        "response" : "email api failure"
      }, 500
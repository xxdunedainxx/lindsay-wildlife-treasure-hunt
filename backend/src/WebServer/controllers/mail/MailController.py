from src.util.LogFactory import LogFactory
from src.WebServer.decorators.HTTPLogger import http_logger
from src.WebServer.WebServerInit import WebServerInit
from src.util.ErrorFactory import errorStackTrace
from src.Singletons import Singletons
from src.util.validators.EmailValidator import EmailValidator
from src.Mail.MailFormatter import MailTypes

from flask import Flask, request

flask_ref: Flask = WebServerInit.flask

class MailController:

  def __init__(self):
    LogFactory.MAIN_LOG.info('Start MailController')

  @staticmethod
  def __valid_post_payload(request) -> bool:
    return "email" not in request.json or "username" not in request.json

  @staticmethod
  def __valid_bug_report_payload(request) -> bool:
    return "message" not in request.json or "deviceInfo" not in request.json or "sessionID" not in request.json or "version" not in request.json

  @staticmethod
  @flask_ref.route('/mail', methods=['POST', 'OPTIONS'])
  @http_logger
  def mail_api():
    try:
      if request.method == 'OPTIONS':
        return {
          "response" : "ok"
        }, 200

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
          "username" : username,
          "type"     : MailTypes.END_USER_CERTIFICATE_EMAIL
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

  @staticmethod
  @flask_ref.route('/report', methods=['POST', 'OPTIONS'])
  @http_logger
  def report_a_bug_api():
    try:
      if request.method == 'OPTIONS':
        return {
          "response" : "ok"
        }, 200

      if request.json == None:
        return {
           "response": "no payload provided"
         }, 400

      LogFactory.MAIN_LOG.info(f"args {request.json}")
      LogFactory.MAIN_LOG.info("report a bug api")
      if MailController.__valid_bug_report_payload(request=request):
        return {
           "response": "Missing data in report"
         }, 400
      message = request.json['message']
      deviceInfo = request.json['deviceInfo']
      sessionID = request.json['sessionID']
      version = request.json['version']

      mail_q = Singletons.mailQ
      email_json = {
        "message": message,
        "deviceInfo": deviceInfo,
        "sessionID" : sessionID,
        "version"  : version,
        "type": MailTypes.REPORT_A_BUG_EMAIL
      }
      # pass the key in the response
      key = mail_q.add_to_q(email_json)
      return {
        "response": "Valid Request",
        "key": key
      }
    except Exception as e:
      LogFactory.MAIN_LOG.error(f"Failed Fetching mail api {errorStackTrace(e)}")
      return {
         "response": "email api failure"
       }, 500
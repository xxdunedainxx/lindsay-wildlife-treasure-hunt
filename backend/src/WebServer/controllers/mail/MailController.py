from src.util.LogFactory import LogFactory
from src.WebServer.decorators.HTTPLogger import http_logger
from src.WebServer.WebServerInit import WebServerInit
from src.util.ErrorFactory import errorStackTrace
from src.Mail.MailQ import MailQ
import re

from flask import Flask, jsonify, request

flask_ref: Flask = WebServerInit.flask

class MailController:

  def __init__(self):
    LogFactory.MAIN_LOG.info('Start MailController')

  @staticmethod
  @flask_ref.route('/mail', methods=['POST'])
  @http_logger
  def mail_api():
    try:
      LogFactory.MAIN_LOG.info("mail api")
      email = request.args['email']
      if emailIsValid(email):
        mailQ = MailQ()
        redisKey = mailQ.q_size() + 1
        mailQ.put_item(redisKey, email)
        return {
          "response" : "valid email"
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

def emailIsValid(email):
  # https://www.w3resource.com/javascript/form/email-validation.php
  regex = "(^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$)"
  if(re.search(regex,email)):
    return True
  else:
    return False
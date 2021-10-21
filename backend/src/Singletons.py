from src.Mail.SMTP import SMTP
from src.Mail.MailQ import MailQ
from src.UILogging.UILogQueue import UILogQueue
from src.data.db_client.DBClient import DBClient
from src.data.db_client.JsonDB import JsonDB
from src.Configuration import Configuration, CONF_INSTANCE
from src.util.LogFactory import LogFactory

class Singletons:

  smtp: SMTP = None
  mailQ: MailQ = None
  db: DBClient = None
  uiLogQ: UILogQueue = None

  @staticmethod
  def generate_singletons():
    Singletons.generate_smtp_client()
    Singletons.generate_mail_q()
    Singletons.generate_db_connection()
    Singletons.generate_ui_log_queue()

  @staticmethod
  def generate_ui_log_queue():
    LogFactory.MAIN_LOG.info('generating smtp client queue')
    Singletons.uiLogQ = UILogQueue.get_ui_log_queue()

  @staticmethod
  def generate_smtp_client():
    LogFactory.MAIN_LOG.info('generating smtp client queue')
    Singletons.smtp = SMTP.get_smtp_client(
      username=CONF_INSTANCE.SMTP_USERNAME,
      password=CONF_INSTANCE.SMTP_PASSWORD,
      server=CONF_INSTANCE.SMTP_SERVER,
      port=CONF_INSTANCE.SMTP_PORT
    )



  @staticmethod
  def generate_mail_q():
    LogFactory.MAIN_LOG.info('generating mail queue')
    if CONF_INSTANCE.MAILER_TOGGLE == True:
      Singletons.mailQ = MailQ.get_mail_q()

  @staticmethod
  def generate_db_connection():
    LogFactory.MAIN_LOG.info('generating DB client')
    if CONF_INSTANCE.DATABASE_ENGINE == "json" :
      Singletons.db = JsonDB.get_db_client(CONF_INSTANCE.DATABASE)
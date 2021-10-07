from src.Mail.SMTP import SMTP
from src.Mail.MailQ import MailQ
from src.Configuration import Configuration, CONF_INSTANCE
from src.util.LogFactory import LogFactory

class Singletons:

  smtp: SMTP = None
  mailQ: MailQ = None

  @staticmethod
  def generate_singletons():
    Singletons.generate_smtp_client()
    Singletons.generate_mail_q()

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
    Singletons.mailQ = MailQ.get_mail_q()

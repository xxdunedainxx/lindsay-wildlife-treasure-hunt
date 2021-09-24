from src.Mail.SMTP import SMTP
from src.Configuration import Configuration, CONF_INSTANCE
from src.util.LogFactory import LogFactory

class Singletons:

  smtp: SMTP = None

  @staticmethod
  def generate_singletons():
    Singletons.generate_smtp_client()

  @staticmethod
  def generate_smtp_client():
    Singletons.smtp = SMTP.get_smtp_client(
      username=CONF_INSTANCE.SMTP_USERNAME,
      password=CONF_INSTANCE.SMTP_PASSWORD,
      server=CONF_INSTANCE.SMTP_SERVER,
      port=CONF_INSTANCE.SMTP_PORT
    )
import os
import json
from src.Services import ServiceNames
from src.util.LogFactory import LogFactory

class Configuration:

  DEFAULT_VALUES : dict = {
    "SMTP_SERVER" : "smtp.gmail.com",
    "SMTP_PORT"   : 465,
    "FLASK_HOST_BIND" : "0.0.0.0",
    "FLASK_PORT_BIND" : 80,
    "FLASK_CORS_ORIGIN": "*",
    "APP_HEALTH_PORT" : 9090,
    "APP_HEALTH_ONLY_API_TOGGLE" : True,
    "SERVICE_TOGGLES" : {
      ServiceNames.mail : True,
      ServiceNames.jsLogs : False,
      ServiceNames.apiServer : True,
      ServiceNames.logRotation: True,
      ServiceNames.redis: True,
      ServiceNames.uiLogger: True
    },
    "PRODUCTION_ENVIRONMENT" : False,
    "DATABASE_ENGINE" : "json",
    "DATABASE" : "db.json",
    "MAIL_JOB_INTERVAL_MINUTES" : 1,
    "MAIL_JOB_EMAILS_PER_JOB"   : 50,

    # Default once a day
    "LOG_ROTATION_JOB_INTERVAL_MINUTES" : 1440,
    "LOG_ROTATION_JOB_EXPIRATION_DAYS"  : 1,
    "LOG_ROTATION_JOB_ARCHIVE_DIR"      : f"archive{os.sep}",
    "UI_LOGGING_JOB_INTERVAL_MINUTES" : 1,
    "UI_LOGGING_JOB_LOGS_PER_JOB"     : 50,
    "BUG_REPORT_EMAIL_LIST" : ["zrmmaster92@gmail.com", "roderickjmacleod@gmail.com"],

    # Static image directory
    "IMAGE_DIR" : f"{os.getcwd()}{os.sep}assets"
  }

  def __init__(self):
    self.VERSION='0.15.0'
    self.CONF_FILE_LOCATION: str  = './conf.json'
    self.RAW_CONF: str = open(self.CONF_FILE_LOCATION,"r").read().strip()
    print(f"Raw configuration file {self.RAW_CONF}")
    self.CONF: dict = json.loads(self.RAW_CONF)

    # SMTP CONFIGS
    self.SMTP_SERVER: str = self.__get_value("SMTP_SERVER")
    self.SMTP_PORT: int = self.__get_value("SMTP_PORT")
    self.SMTP_USERNAME: str = self.__get_value("SMTP_USERNAME")
    self.SMTP_PASSWORD: str = self.__get_value("SMTP_PASSWORD")
    
    # Redis Configs
    self.REDIS_HOST: str = self.__get_value("REDIS_HOST")
    self.REDIS_PORT: int = self.__get_value("REDIS_PORT")
    self.MAILER_TOGGLE: bool = self.__get_value("MAILER_TOGGLE")

    # Flask configurations
    self.FLASK_HOST_BIND: str = self.__get_value("FLASK_HOST_BIND")
    self.FLASK_PORT_BIND: int = self.__get_value("FLASK_PORT_BIND")
    self.FLASK_CORS_ORIGIN: str = self.__get_value("FLASK_CORS_ORIGIN")
    self.APP_HEALTH_PORT: bool = self.__get_value("APP_HEALTH_PORT")

    # General Configs
    self.SERVICE_TOGGLES: dict = self.__get_value("SERVICE_TOGGLES")
    self.PRODUCTION_ENVIRONMENT: bool = self.__get_value("PRODUCTION_ENVIRONMENT")
    self.DATABASE_ENGINE: str = self.__get_value("DATABASE_ENGINE")
    self.DATABASE: str = self.__get_value("DATABASE")
    self.MAIL_JOB_INTERVAL_MINUTES: int = self.__get_value("MAIL_JOB_INTERVAL_MINUTES")
    self.MAIL_JOB_EMAILS_PER_JOB: int = self.__get_value("MAIL_JOB_EMAILS_PER_JOB")

    # Log rotation job configuration
    self.LOG_ROTATION_JOB_INTERVAL_MINUTES: int = self.__get_value("LOG_ROTATION_JOB_INTERVAL_MINUTES")
    self.LOG_ROTATION_JOB_EXPIRATION_DAYS: int = self.__get_value("LOG_ROTATION_JOB_EXPIRATION_DAYS")
    self.LOG_ROTATION_JOB_ARCHIVE_DIR: str = self.__get_value("LOG_ROTATION_JOB_ARCHIVE_DIR")

    # UI Logger Job configs
    self.UI_LOGGING_JOB_INTERVAL_MINUTES: int = self.__get_value("UI_LOGGING_JOB_INTERVAL_MINUTES")
    self.UI_LOGGING_JOB_LOGS_PER_JOB: int = self.__get_value("UI_LOGGING_JOB_LOGS_PER_JOB")
    self.BUG_REPORT_EMAIL_LIST: [str] = self.__get_value("BUG_REPORT_EMAIL_LIST")

    # Static images
    self.IMAGE_DIR: str = self.__get_value("IMAGE_DIR")



  def __get_value(self, key: str):
    # environment variables have highest prio
    if key in os.environ.keys():
      return self.__get_environ_value(key)
    elif key in self.CONF.keys():
      return self.__parse_conf_file_value(key)
    elif key in Configuration.DEFAULT_VALUES.keys():
      return self.DEFAULT_VALUES[key]
    else:
      raise Exception(f"Could not find value for required key {key} :(")

  def __get_environ_value(self, key: str):
    return os.environ.get(key)

  def __parse_conf_file_value(self, key: str):
    return self.CONF[key]

CONF_INSTANCE = Configuration()
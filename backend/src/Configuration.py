import os
import json
from src.Services import ServiceNames

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
      ServiceNames.mail : False,
      ServiceNames.jsLogs : False,
      ServiceNames.apiServer : True
    },
    "PRODUCTION_ENVIRONMENT" : False,
    "DATABASE_ENGINE" : "json",
    "DATABASE" : "db.json"
  }

  def __init__(self):
    self.CONF_FILE_LOCATION: str  = './conf.json' if 'SYNCER_CONF' not in os.environ.keys() else os.environ['SYNCER_CONF']
    self.CONF: dict = json.load(open(self.CONF_FILE_LOCATION,"r"))

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
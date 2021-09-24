import os
import json

class Configuration:
  DEFAULT_VALUES : dict = {
    "SMTP_SERVER" : "smtp.gmail.com",
    "SMTP_PORT"   : 465
  }

  def __init__(self):
    self.CONF_FILE_LOCATION: str  = './conf.json' if 'SYNCER_CONF' not in os.environ.keys() else os.environ['SYNCER_CONF']
    self.CONF: dict = json.load(open(self.CONF_FILE_LOCATION,"r"))

    # SMTP CONFIGS
    self.SMTP_SERVER: str = self.__get_value("SMTP_SERVER")
    self.SMTP_PORT: int = self.__get_value("SMTP_PORT")
    self.SMTP_USERNAME: str = self.__get_value("SMTP_USERNAME")
    self.SMTP_PASSWORD: str = self.__get_value("SMTP_PASSWORD")

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
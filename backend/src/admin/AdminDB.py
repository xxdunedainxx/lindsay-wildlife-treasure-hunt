import os
import json
from src.Services import ServiceNames
from src.util.LogFactory import LogFactory
from src.util.FileIO import FileIO

class AdminDB:

  DEFAULT_VALUES : dict = {
    "WALLBOARD_CONFIGS" : {}
  }

  def __init__(self, confFile: str = './src/admin/admin_db.json'):
    self._init_conf(confFile)
    self._init_values()


  def _init_conf(self, conf: str):
    FileIO.create_file_if_does_not_exist(conf, json.dumps({
      "WALLBOARD_CONFIGS" : {}
    }))
    self.CONF_FILE_LOCATION: str  = conf
    self.RAW_CONF: str = open(self.CONF_FILE_LOCATION,"r").read().strip()
    print(f"Raw configuration file {self.RAW_CONF}")
    self.CONF: dict = json.loads(self.RAW_CONF)


  def _init_values(self):
    # Wallboard Configs
    self.WALLBOARD_CONFIGS: dict = self._get_value("WALLBOARD_CONFIGS")


  def _get_value(self, key: str):
    # environment variables have highest prio
    if key in os.environ.keys():
      return self.__get_environ_value(key)
    elif key in self.CONF.keys():
      return self.__parse_conf_file_value(key)
    elif key in AdminDB.DEFAULT_VALUES.keys():
      return self.DEFAULT_VALUES[key]
    else:
      raise Exception(f"Could not find value for required key {key} :(")

  def __get_environ_value(self, key: str):
    return os.environ.get(key)

  def __parse_conf_file_value(self, key: str):
    return self.CONF[key]

  def to_json(self):
    return {
      "WALLBOARD_CONFIGS" : self.WALLBOARD_CONFIGS
    }

  def rewrite_db(self):
    LogFactory.MAIN_LOG.info("Re-write Admin DB")
    FileIO.replace_file_content(self.CONF_FILE_LOCATION, json.dumps(self.to_json()))
if 'ADMIN_DB_LOCATION' in os.environ.keys():
  ADMIN_DB = AdminDB(os.environ['ADMIN_DB_LOCATION'])
else:
  ADMIN_DB = AdminDB()
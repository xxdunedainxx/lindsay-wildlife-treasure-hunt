from src.util.FileIO import FileIO

import json
import os

class Config:

  DEFAULT_CONFIG = {
    'logging' :{
      'log_dir' : '',
      'log_level' : 'INFO'
    }
  }


  root_dir: str = f"{os.getcwd()}"

  conf_file_location: str = f"{root_dir}/conf.json"
  conf_file: dict
  LOG_DIR: str
  LOG_LEVEL: str

  def __init__(self):
    pass

  @staticmethod
  def init_config():
    if FileIO.file_exists(Config.conf_file_location):
      Config.conf_file = json.load(open(Config.conf_file_location))
    else:
      Config.conf_file = Config.DEFAULT_CONFIG

    Config.LOG_DIR = Config.conf_file['logging']['log_dir']
    Config.LOG_LEVEL = Config.conf_file['logging']['log_level']


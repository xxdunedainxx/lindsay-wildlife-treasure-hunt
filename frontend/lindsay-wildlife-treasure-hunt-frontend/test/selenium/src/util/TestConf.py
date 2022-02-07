import os
import json

class TestConf:

  def __init__(self):
    self.CONF_FILE_LOCATION: str = './test.json'
    self.CONF: dict = json.load(open(self.CONF_FILE_LOCATION, "r"))

    self.TEST_OS: str = self.__get_value("TEST_OS")
    self.BROWSER: str = self.__get_value("BROWSER")
    self.BASE_URL: str = self.__get_value("BASE_URL")
    self.PAGE_TITLE: str = self.__get_value("PAGE_TITLE")


  def __get_value(self, key: str):
    # environment variables have highest prio
    if key in os.environ.keys():
      return self.__get_environ_value(key)
    elif key in self.CONF.keys():
      return self.__parse_conf_file_value(key)
    else:
      raise Exception(f"Could not find value for required key {key} :(")

  def __get_environ_value(self, key: str):
    return os.environ.get(key)

  def __parse_conf_file_value(self, key: str):
    return self.CONF[key]


TEST_CONF = TestConf()
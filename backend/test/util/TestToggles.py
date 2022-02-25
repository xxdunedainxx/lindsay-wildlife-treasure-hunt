import os
import json
from src.util.LogFactory import LogFactory

class TestToggles:
  DEFAULT_VALUES: dict = {
    "UNIT_TESTING_ENABLED" : True,
    "INTEGRATION_TESTING_ENABLED" : True,
    "END_TO_END_TESTING_ENABLED" : False
  }

  def INTEGRATION_ENABLED(self):
    return self.INTEGRATION_TESTING_ENABLED != False and self.INTEGRATION_TESTING_ENABLED != "false"

  def E2E_ENABLED(self):
    return self.END_TO_END_TESTING_ENABLED != False and self.END_TO_END_TESTING_ENABLED != "false"

  def UNIT_ENABLED(self):
    return self.UNIT_TESTING_ENABLED != False and self.UNIT_TESTING_ENABLED != "false"
    
  def __init__(self):
    self.CONF_FILE_LOCATION: str = './test.json'
    self.CONF: dict = json.load(open(self.CONF_FILE_LOCATION, "r"))

    self.UNIT_TESTING_ENABLED: bool = self.__get_value("UNIT_TESTING_ENABLED")
    self.INTEGRATION_TESTING_ENABLED: bool = self.__get_value("INTEGRATION_TESTING_ENABLED")
    self.END_TO_END_TESTING_ENABLED: bool = self.__get_value("END_TO_END_TESTING_ENABLED")
    self.__print_test_toggles()

  def __print_test_toggles(self):
    print(f"Testing TOGGLES: ")
    print(f"UNIT_TESTING_ENABLED: {self.UNIT_TESTING_ENABLED}")
    print(f"INTEGRATION_TESTING_ENABLED: {self.INTEGRATION_TESTING_ENABLED}")
    print(f"END_TO_END_TESTING_ENABLED: {self.END_TO_END_TESTING_ENABLED}")

  def __get_value(self, key: str):
    # environment variables have highest prio
    if key in os.environ.keys():
      return self.__get_environ_value(key)
    elif key in self.CONF.keys():
      return self.__parse_conf_file_value(key)
    elif key in TestToggles.DEFAULT_VALUES.keys():
      return self.DEFAULT_VALUES[key]
    else:
      raise Exception(f"Could not find value for required key {key} :(")

  def __get_environ_value(self, key: str):
    return os.environ.get(key)

  def __parse_conf_file_value(self, key: str):
    return self.CONF[key]


TEST_CONF = TestToggles()
import json
from src.util.LogFactory import LogFactory

class Model:

  def __init__(self, jObject : dict):
    self._original_object: dict = jObject
    self.json_to_model(jObject)

  def json_to_model(self, jObject: dict):
    raise NotImplementedError('json_to_model not implemented')

  def to_dictionary(self) -> dict:
    return self._original_object

  def get_attribute(self, dict: {}, attributeName: str):
    LogFactory.MAIN_LOG.debug("Transforming model")
    if attributeName in dict.keys():
      return dict[attributeName]
    else:
      raise Exception('attribute does not exist....')
from typing import Any

class DBClient:
  INSTANCE = None

  def __init__(self):
    pass

  def get_item(self, key: Any):
    raise NotImplementedError('json_to_model not implemented')

  def put_item(self, key: Any, data: Any):
    raise NotImplementedError('json_to_model not implemented')

  def delete_item(self, key: Any):
    raise NotImplementedError('json_to_model not implemented')

  def get_items(self):
    raise NotImplementedError('json_to_model not implemented')

  def get_items_filter(self, filter: Any):
    raise NotImplementedError('json_to_model not implemented')
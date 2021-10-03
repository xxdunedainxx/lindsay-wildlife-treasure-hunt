from src.data.db_client.DBClient import DBClient

class JsonDB(DBClient):

  def __init__(self):
    super(DBClient, self).__init__()

    def get_item(self, key: str):
      raise NotImplementedError('json_to_model not implemented')

    def put_item(self, key: str, data: dict):
      raise NotImplementedError('json_to_model not implemented')

    def delete_item(self, key: str):
      raise NotImplementedError('json_to_model not implemented')

    def get_items(self):
      raise NotImplementedError('json_to_model not implemented')

    def get_items_filter(self, filter: str):
      raise NotImplementedError('json_to_model not implemented')
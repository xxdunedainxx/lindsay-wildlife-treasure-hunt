from src.data.db_client.DBClient import DBClient
import json

class JsonDB(DBClient):

  @staticmethod
  def get_db_client(dbPath: str):
    if DBClient.INSTANCE == None:
      DBClient.INSTANCE = JsonDB(dbPath)
    return DBClient.INSTANCE

  def __init__(self, dbPath: str):
    super(DBClient, self).__init__()
    self.__dbPath = dbPath


  def get_item(self, key: str):
    db: dict = json.load(open(self.__dbPath, 'r'))
    return db[key]

  def put_item(self, key: str, data: dict):
    db: dict = json.load(open(self.__dbPath, 'r'))
    db[key] = data
    json.dump(db, open(self.__dbPath, 'w+'))

  def delete_item(self, key: str):
    pass

  def get_items(self):
    db: dict = json.load(open(self.__dbPath, 'r'))
    return db

  def get_items_filter(self, filter: str):
    pass


from src.util.LogFactory import LogFactory
from src.data.db_client.JsonDB import JsonDB
from test.util.decorators.Toggle import enabled, disabled

import unittest

@enabled
def db_unit_testing():

    LogFactory.MAIN_LOG.info(f"RUNNING ALL DB TESTS")
    unittest.main(module=__name__, exit=False)

class JSONDBTesting(unittest.TestCase):
    @enabled
    def test_json_db_data_get_operations(self):
      LogFactory.MAIN_LOG.info('Executing test \'test_json_db_data_get_operations\'')
      db: JsonDB = JsonDB("db.json")
      db.get_items()

    @enabled
    def test_json_db_data_contents(self):
      LogFactory.MAIN_LOG.info('Executing test \'test_json_db_data_contents\'')
      db: JsonDB = JsonDB("db.json")
      raw_db: dict = db.get_items()

      assert "game" in raw_db.keys()
      assert "IntroductionMessage" in raw_db["game"].keys()
      assert "CongratsMessage" in raw_db["game"].keys()
      assert "GameSequence" in raw_db["game"].keys()

      for db_item in raw_db["game"]["GameSequence"]:
        LogFactory.MAIN_LOG.info(f"Iterating game key: {db_item}")
        assert "ArtifactName" in db_item.keys() and type(db_item["ArtifactName"]) is list
        assert "ArtifactId" in db_item.keys() and type(db_item["ArtifactId"]) is str
        assert "Clue" in db_item.keys() and type(db_item["Clue"]) is str
        assert "AdditionalHint" in db_item.keys() and type(db_item["AdditionalHint"]) is str
        assert "CorrectMessage" in db_item.keys() and type(db_item["CorrectMessage"]) is str
        assert "MediaLink" in db_item.keys() and type(db_item["MediaLink"]) is str
        assert "Credit" in db_item.keys() and type(db_item["Credit"]) is str
      


if __name__ == "__main__":
    unittest.main()
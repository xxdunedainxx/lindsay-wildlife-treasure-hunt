from data.models.Model import Model
from data.models.game.Level import Level

class ScavengerHunt(Model):
  def __init__(self, jObject : dict):
    super(Model, self).__init__(jObject)

  def json_to_model(self, jObject: dict):
    self.name: str = self.get_attribute(jObject, "Name")
    self.version: str =  self.get_attribute(jObject, "Version")
    self.introMessage: str = self.get_attribute(jObject["game"], "IntroductionMessage")
    self.congratsMessage: str = self.get_attribute(jObject["game"], "CongratsMessage")
    self.levels: [Level] = []

    for level in jObject["game"]["GameSequence"]:
      self.levels.append(Level(level))

  def to_dictionary(self) -> dict:
    return self._original_object
from data.models.Model import Model

class Level(Model):
  def __init__(self, jObject : dict):
    super(Model, self).__init__(jObject)

  def json_to_model(self, jObject: dict):
    self.name: str = self.get_attribute(jObject, "ArtifactName")
    self.clue: str = self.get_attribute(jObject, "Clue")
    self.hint: str = self.get_attribute(jObject, "AdditionalHint")
    self.correctMessage: str = self.get_attribute(jObject, "CorrectMessage")
    self.mediaLink: str = self.get_attribute(jObject, "MediaLink")

  def to_dictionary(self) -> dict:
    return self._original_object
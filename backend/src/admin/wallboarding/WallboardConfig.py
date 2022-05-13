import requests

class WallboardConfig:

  # TODO Resolution
  # TODO
  def __init__(self,
       name: str,
       description: str,
       url: str
    ):
    self.url: str = url
    self.name: str = name
    self.description: str = description

  def to_json(self) -> dict:
    return {
      "description" : self.description,
      "name" : self.name,
      "url" : self.url
    }

  def url_resolvable(self) -> bool:
    get = requests.get(self.url)

    return get.status_code >= 200 and get.status_code <= 299 and get.status_code >= 300 and get.status_code <= 399
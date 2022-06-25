import requests
from enum import Enum
from typing import Any

class WallboardConfig:

  class WallboardProfile(Enum):
    image     = "image"
    slideshow = "slideshow"

  def __init__(self,
       name: str,
       description: str,
       url: Any, # can be str or [str]
       profile: str,
       interval: int = 0
    ):
    self.url: str = url
    self.name: str = name
    self.description: str = description
    self.interval: int = interval
    self.profile: str = profile

  def to_json(self) -> dict:
    return {
      "description" : self.description,
      "name" : self.name,
      "url" : self.url
    }

  def url_resolvable(self) -> bool:
    get = requests.get(self.url)

    return get.status_code >= 200 and get.status_code <= 299 and get.status_code >= 300 and get.status_code <= 399
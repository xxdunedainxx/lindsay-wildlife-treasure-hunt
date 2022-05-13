import random
import string

class RandomGenerator:

  def __init__(self):
    pass

  @staticmethod
  def generate_random_string(length: int) -> str:
    r_string_builder: str = ''
    rand_int: int = 0
    for i in range(length):
      rand_int = random.randint(0,1000000)

      if rand_int % 2 == 0:
        r_string_builder += random.choice(string.ascii_uppercase)
      else:
        r_string_builder += str(random.randint(0,10))

    return r_string_builder
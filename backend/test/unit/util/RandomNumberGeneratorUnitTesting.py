from src.util.RandomGenerator import RandomGenerator
from src.util.LogFactory import LogFactory

from test.util.decorators.Toggle import enabled, disabled

import unittest

@enabled
def random_number_generation_tests():
    LogFactory.MAIN_LOG.info(f"RUNNING rng tests")
    unittest.main(module=__name__, exit=False)

class RandomNumberGenerationUnitTests(unittest.TestCase):

    @enabled
    def test_get_number(self):
      length: int = 100
      num_str: str = RandomGenerator.generate_random_string(length)
      assert len(num_str) == length

      num_str_2: str = RandomGenerator.generate_random_string(length)

      assert  num_str != num_str_2


if __name__ == "__main__":
    unittest.main()

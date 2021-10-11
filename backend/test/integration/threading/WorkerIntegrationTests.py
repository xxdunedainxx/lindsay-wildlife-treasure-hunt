from src.util.LogFactory import LogFactory
from src.MultiThreading.ThreadPool import Worker, process_is_alive
from src.util.FileIO import FileIO
from test.util.decorators.Toggle import enabled, disabled
import time
import unittest


@enabled
def threading_integration_tests():

    LogFactory.MAIN_LOG.info(f"RUNNING ALL MAIL CONTROLLER TESTS")
    unittest.main(module=__name__, exit=False)

def threading_loop(args):
  while True:
    print('blah')
    time.sleep(5)


def write_tmp_file(args):
  f = open('test.tmp', 'w+')
  f.write("hello")


class ThreadingIntegrationTests(unittest.TestCase):

  @enabled
  def test_process_is_alive(self):
      testWorker: Worker = Worker(
        targetMethod=threading_loop,
        targetMethodArgs=['something']
      )

      testWorker.run()

      LogFactory.MAIN_LOG.info(f"Testinf PID {testWorker.get_pid()}")

      assert process_is_alive(testWorker.get_pid()) == True
      testWorker.kill()

  @enabled
  def test_sub_process_file_io(self):
      testWorker: Worker = Worker(
        targetMethod=write_tmp_file,
        targetMethodArgs=['something']
      )

      testWorker.run()

      LogFactory.MAIN_LOG.info(f"Testinf PID {testWorker.get_pid()}")
      time.sleep(1)
      assert FileIO.file_exists('test.tmp') == True

      FileIO.delete_file('test.tmp')
if __name__ == '__main__':
  unittest.main()
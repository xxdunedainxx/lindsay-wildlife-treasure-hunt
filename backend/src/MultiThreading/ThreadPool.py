from multiprocessing import Process
from src.util.LogFactory import LogFactory

class Worker:

  def __init__(self, targetMethod, targetMethodArgs):
    self._process: Process = Process(target=targetMethod, args=targetMethodArgs)

  def run(self):
    self._process.start()

  def kill(self):
    try:
      self._process.kill()
    except Exception as e:
      self._process.terminate()


class WorkerPool:

  POOL_MIN: int = 1
  POOL_MAX: int = 30
  WORKERS: dict = {
    'default' : Worker,
  }

  def __init__(self,targetMethod, size: int = 10, poolType: str = 'default', targetMethodArgs = None):

    if targetMethodArgs == None:
      targetMethodArgs = {}

    LogFactory.MAIN_LOG.info(f"Starting WorkerPool of size {size}, of type {poolType}, with args {targetMethodArgs} for method {targetMethod}")
    self.pool_size: int = size
    self.pool = []
    self.worker_type: Worker = None
    if poolType not in WorkerPool.WORKERS.keys():
      self.worker_type = WorkerPool.WORKERS['default']
    else:
      self.worker_type = WorkerPool.WORKERS[poolType]

    for i in range(self.pool_size):
      worker=self.worker_type(targetMethod, targetMethodArgs)
      self.pool.append(worker)

  def run(self):
    for worker in self.pool:
      worker.run()

  def destroy_pool(self):
    for worker in self.pool:
      worker.kill()
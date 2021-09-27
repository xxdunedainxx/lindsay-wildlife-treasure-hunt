from multiprocessing import Process
import psutil

from src.util.LogFactory import LogFactory
from src.util.FileIO import FileIO

import json

def process_is_alive(pid: int):
  return psutil.pid_exists(pid)

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

  def get_pid(self):
    return self._process.pid

class WorkerPool:

  @staticmethod
  def generate_info_filename(service: str):
    return f"worker-pool-{service}-info.json"

  POOL_MIN: int = 1
  POOL_MAX: int = 30
  WORKERS: dict = {
    'default' : Worker,
  }


  def __init__(self,poolName: str, targetMethod, size: int = 10, poolType: str = 'default', targetMethodArgs = None):
    self.name = poolName
    self.info: dict = {
      "workerPids" : [],
      "type" : poolType,
      "name" : poolName,
      "active" : True
    }
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
      self.info["workerPids"].append(worker.get_pid())
    self.write_pool_info()

  def destroy_pool(self):
    for worker in self.pool:
      worker.kill()
    self.info["active"] = False
    self.write_pool_info()

  def write_pool_info(self):
    FileIO.replace_file_content(path=WorkerPool.generate_info_filename(self.name), content=json.dumps(self.info))
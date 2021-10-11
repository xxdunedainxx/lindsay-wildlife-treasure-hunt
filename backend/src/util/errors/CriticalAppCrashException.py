class CriticalAppCrashedException(Exception):
  def __init__(self, errorMessage: str):
    super().__init__(f"Application Crashed with Exception {errorMessage}")
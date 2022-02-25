#! /bin/bash

export INTEGRATION_TESTING_ENABLED=true
export END_TO_END_TESTING_ENABLED=false
export UNIT_TESTING_ENABLED=false

PYTHON_INTERPRETER=($(which python3 || which python))

function log() {
  echo "$(date) :: ${1}"
}

function runPythonAppInBackground(){
  log "running python app in backgorund"
  nohup ./scripts/run.sh > backend.out 2>&1 &
  sleep 2
  log "Backend std.out:"
  cat backend.out
  curl http://localhost:9090/health -v 
  PYTHON_BACKGROUND_PID=$(cat PRIMARY.PID)
  log "Python background process is running as PID ${PYTHON_BACKGROUND_PID}"
  log "app status above ^"
}

function killPythonApp(){
  log "tearing down python app"
  kill -s SIGTERM $PYTHON_BACKGROUND_PID
}

function runPythonBackendTesting(){
  ${PYTHON_INTERPRETER} test.py

  if [[ $? != 0 ]];
  then
    log "PYTHON TESTING FAILED!!!!!!!" 
    exit 1
  else
    log "python testing passed :)"
  fi
}

runPythonAppInBackground
runPythonBackendTesting
killPythonApp
#! /bin/bash

### THIS SCRIPT RUNS ALL COMPREHENSIVE TESTING FOR THE LINDSAY APP ###

HOME=$(pwd)
PYTHON_BACKGROUND_PID=-1

function log() {
	echo "$(date) :: ${1}"
}

function killPythonApp(){
  log "tearing down python app"
  kill -s SIGTERM $PYTHON_BACKGROUND_PID
}

function lintPythonApp(){
  echo "Linting python app..."
  pylint backend \
  --indent-string='  ' \
  --class-naming-style='PascalCase' \
   --module-naming-style='PascalCase' > pylint.log
  echo "see linting score in 'pylint.log'"
}

function runPythonAppInBackground(){
  log "running python app in backgorund"
  cd ./backend
  nohup ./scripts/run.sh >/dev/null 2>&1 &
  sleep 3
  curl http://localhost:9090/health -v 
  PYTHON_BACKGROUND_PID=$(cat PRIMARY.PID)
  log "Python background process is running as PID ${PYTHON_BACKGROUND_PID}"
  log "app status above ^"
  cd $HOME
}

function runPythonBackendTesting(){
	cd backend
	python3 test.py

	if [[ $? != 0 ]];
	then
		log "PYTHON TESTING FAILED!!!!!!!" 
		exit 1
	else
		log "python testing passed :)"
	fi
}

function runReactTests(){
  cd $HOME
  cd frontend/lindsay-wildlife-treasure-hunt-frontend

  log "Executing react Unit testing"
  npm run-script unit-testing
  # log "Executing react integration tests"
  # npm run-script integration-testing
  cd $HOME
}


function startRedis(){
  ./infrastructure/redis/start_local_redis.sh
}
log "Executing Lindsay Wildlife Full Stack Testing"

# startRedis
lintPythonApp
runPythonAppInBackground
runPythonBackendTesting
runReactTests
killPythonApp
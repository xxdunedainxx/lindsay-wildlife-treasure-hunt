#! /bin/bash

### THIS SCRIPT RUNS ALL COMPREHENSIVE TESTING FOR THE LINDSAY APP ###

HOME=$(pwd)

function log() {
	echo "$(date) :: ${1}"
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


function startRedis(){
  ./infrastructure/redis/start_local_redis.sh
}
log "Executing Lindsay Wildlife Full Stack Testing"

startRedis
runPythonBackendTesting
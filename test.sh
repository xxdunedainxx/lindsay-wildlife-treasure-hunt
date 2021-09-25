#! /bin/bash

### THIS SCRIPT RUNS ALL COMPREHENSIVE TESTING FOR THE LINDSAY APP ###

HOME=$(pwd)

function log() {
	echo "$(date) :: ${1}"
}

function runPythonBackendTesting(){
	cd backend
	python test.py

	if [[ $? != 0 ]];
	then
		log "PYTHON TESTING FAILED!!!!!!!" 
		exit 1
	else
		log "python testing passed :)"
	fi
}

log "Executing Lindsay Wildlife Full Stack Testing"

runPythonBackendTesting
#! /bin/bash

HOME=$(pwd)

function log() {
	echo "$(date) :: ${1}"
}

function runSeleniumTests(){
  log "Executing Selenium tests"
  python3 test.py
}

runSeleniumTests
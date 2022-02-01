#! /bin/bash

HOME=$(pwd)

function log() {
	echo "$(date) :: ${1}"
}

function runSeleniumTests(){
  cd $HOME
  cd frontend/lindsay-wildlife-treasure-hunt-frontend/test/selenium
  PYTHON_INTERPRETER=($(which python || which python3))

  log "Executing Selenium integration tests"
  ${PYTHON_INTERPRETER} selenium_ui_tests.py
}

runSeleniumTests
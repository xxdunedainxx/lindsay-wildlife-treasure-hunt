#!/bin/bash

# LINDSAY WILDLIFE WALLBOARD
# This script can be used to setup and run a lindsay wallboard

CURRENT_DIR="$( cd -- "$(dirname "$0")" >/dev/null 2>&1 ; pwd -P )"

function log() {
  log="$(date) :: ${1}"
  echo $log
  echo $log >> wallboard.log
}

function installChrome(){
  log "Installing Chrome"
}

function configureOnStartup(){
  log "Configuring chrome wallboard to run on startup"

  # Write out to login shell
  echo "${CURRENT_DIR}/wallboard.sh run" >> ~/.bash_profile
}

function setupWallboardURL(){
  read -p "Please provide the Wallboard's URL:" WALLBOARD_URL
  echo $WALLBOARD_URL > wallboard_files/WALLBOARD_URL.txt
}

function setup(){
  log "Executing Setup"

  log "Setting up file system.."
  rm -rf wallboard_files
  mkdir -p wallboard_files

  log "Setting up required variables"
  setupWallboardURL

  installChrome
  configureOnStartup

  touch .wallboardsetupcomplete
}

function reportEndpointStatus(){
  log "Reporting endpoint status & info"
}

function runPreflightCheck(){
  log "Running Pre-flight check"
  if [ -f ".wallboardsetupcomplete" ]
  then
    log "Preflight check passed"
  else
     log "Preflight check failed!!"
     exit 1
  fi
}

function runChrome(){
  log "START CHROME RUNNER"

  WALLBOARD_URL=$(cat ./wallboard_files/WALLBOARD_URL.txt)
  WALLBOARD_CMD=""

  if [[ $(uname) == 'Darwin' ]];
  then
    log "Running on MacOS"
    WALLBOARD_CMD=`
    /Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome \
      --start-fullscreen \
      --kiosk \
      --fullscreen \
      --private-window \
      --app="${WALLBOARD_URL}"
    `
  else
    log "Runinng on standard Linux"
    WALLBOARD_CMD=`
    google-chrome \
      --start-fullscreen \
      --kiosk \
      --fullscreen \
      --private-window \
      --app="${WALLBOARD_URL}"
    `    
  fi

  log "Running command ${WALLBOARD_CMD}"

  eval $WALLBOARD_CMD
}

function runWallBoard(){
  log "Running wallboard"

  runPreflightCheck
  reportEndpointStatus
  runChrome
}

function usage(){
  echo "How to use this cli:"
  echo "     ./wallboard.sh setup|run"
}

log "Start wallboard.sh"
log "Running from ${CURRENT_DIR}"

if [[ $1 == "setup" ]];
then
  setup
elif [[ $1 == "run" ]];
then
  runWallBoard
else
  usage
fi
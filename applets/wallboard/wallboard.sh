#!/bin/bash

# LINDSAY WILDLIFE WALLBOARD
# This script can be used to setup and run a lindsay wallboard

# CHANGELOG
## 1.0.0:: Initial implementation, setup, etc
## 1.0.1:: Automate Orientation for raspbian
## 1.0.2:: Disable sleep and energy saver, setup log output nit
## 1.1.0:: Wallboarding Remote Configuration

VERSION="1.1.0"
CURRENT_DIR="$( cd -- "$(dirname "$0")" >/dev/null 2>&1 ; pwd -P )"

cd $CURRENT_DIR

function log() {
  log="$(date) :: ${1}"
  echo $log
  echo $log >> wallboard.log
}

function installChrome(){
  log "Installing Chrome"

  if [[ $(uname) == 'Darwin' ]];
  then
    log "Installing chrome on MacOS"
  else
    log "Installing on Raspbian"
    if command -v chromium-browser > /dev/null ;
    then
      log "Chromium already installed, skipping"
    else
      log "Installing chrome on raspbian"
      sudo apt-get update && sudo apt-get install chromium-browser
    fi
  fi
}

function configureOnStartup(){
  log "Configuring chrome wallboard to run on startup"

  if [[ $(uname) == 'Darwin' ]];
  then
    log "Setting up MacOS"
    echo "${CURRENT_DIR}/wallboard.sh run" >> ~/.bash_profile
  else
    log "Setting up Raspbian"
    # Assume raspbian
    cp -r /etc/xdg/lxsession ~/.config/
    echo "" >> ~/.config/lxsession/LXDE-pi/autostart
    echo "#### Lindsay Wildlife Wallboarding Setup ####" >> ~/.config/lxsession/LXDE-pi/autostart
    echo "@lxterminal --command ${CURRENT_DIR}/wallboard.sh" >> ~/.config/lxsession/LXDE-pi/autostart
  fi
}

function configureRemoteHost(){
  read -p "Is this host remotely managed?[Y:N]:" REMOTE_MANAGED
  log "${REMOTE_MANAGED} provided for remote management"
  echo "export REMOTE_MANAGED=${REMOTE_MANAGED}" >> wallboard_files/WALLBOARD_VARS.src

  if [[ $REMOTE_MANAGED == "Y" ]]; then
    read -p "Please provide the remote host:" REMOTE_HOST
    log "${REMOTE_HOST} provided for remote HOST"
    echo "export REMOTE_HOST=${REMOTE_HOST}" >> wallboard_files/WALLBOARD_VARS.src

    read -p "Please provide the remote host basic auth(in the form username:password):" REMOTE_HOST_AUTH
    log "${REMOTE_HOST_AUTH} provided for remote host auth"
    echo "export REMOTE_HOST_AUTH=${REMOTE_HOST_AUTH}" >> wallboard_files/WALLBOARD_VARS.src
  else
    setupWallboardURL
  fi


}

function configureOrientation(){
  read -p "Please provide the orientation [vertical:horizontal]:" ORIENTATION
  log "${ORIENTATION} provided for orientation"
  echo "export ORIENTATION=${ORIENTATION}" >> wallboard_files/WALLBOARD_VARS.src
}

function disableSleepAndEnergySaver(){
  if [[ $(uname) == 'Darwin' ]];
  then
    log "Macos, skipping energy saver settings"
  else
    log "Disabling sleep/energy saver..."
    xset s 0
    xset -dpms
  fi
}

function setupWallboardURL(){
  read -p "Please provide the Wallboard's URL:" WALLBOARD_URL
  echo "export WALLBOARD_URL=${WALLBOARD_URL}" > wallboard_files/WALLBOARD_VARS.src
}

function setup(){
  log "Executing Setup"

  log "Setting up file system.."
  rm -rf wallboard_files
  mkdir -p wallboard_files
  touch wallboard_files/WALLBOARD_VARS.src

  log "Setting up required variables"
  configureRemoteHost

  installChrome
  configureOnStartup
  configureOrientation
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
  source 
  WALLBOARD_CMD=""

  if [[ $REMOTE_MANAGED == "Y" ]]; then
    log "Getting url from remote host ${REMOTE_HOST}"
    curl $REMOTE_HOST -u $REMOTE_HOST_AUTH

    if [[ $? != 0  ]]; then
      echo "Remote host not available... Using cache"
      WALLBOARD_URL=$(cat ./wallboard_files/WALLBOARD_CACHE.txt)
    else
      WALLBOARD_URL=$(curl $REMOTE_HOST -u $REMOTE_HOST_AUTH)
      echo $WALLBOARD_URL > ./wallboard_files/WALLBOARD_CACHE.txt
    fi

  fi

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
    chromium-browser \
      --start-fullscreen \
      --kiosk \
      --start-maximized \
      --private-window \
      "${WALLBOARD_URL}"
    `    
  fi

  log "Running command ${WALLBOARD_CMD}"

  eval $WALLBOARD_CMD
}

function runWallBoard(){
  log "Running wallboard"

  source wallboard_files/WALLBOARD_VARS.src

  runPreflightCheck
  reportEndpointStatus
  orientWallboard
  disableSleepAndEnergySaver
  runChrome
}

function usage(){
  echo "How to use this cli:"
  echo "     ./wallboard.sh setup|run|help"
}

function versionFile(){
  log "Running version ${VERSION}"
  echo $VERSION > ./wallboard_files/VERSION
}

function orientWallboard(){
  orientationConfigured=$ORIENTATION
  log "Orienting based on ${orientationConfigured}"
  if [[ $orientationConfigured == 'vertical' ]];then
    log "Vertical orientation provided"
    if [[ $(uname) == 'Darwin' ]];
    then
      log "Macos, skipping orientation"
    else
      xrandr --output HDMI-1 --rotate normal
    fi
  else
    log "Default to horizontal orientation"
    if [[ $(uname) == 'Darwin' ]];
    then
      log "Macos, skipping orientation"
    else
      xrandr --output HDMI-1 --rotate left
    fi
  fi
}

log "Start wallboard.sh"
log "Running from ${CURRENT_DIR}"

versionFile

if [[ $1 == "setup" ]];
then
  setup
elif [[ $1 == "help" ]];
then
  usage
else
  runWallBoard
fi
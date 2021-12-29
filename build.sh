#! /bin/bash

# build all of the containers :)

HOME=$(pwd)

function log() {
  echo "$(date) :: ${1}"
}

function buildBackend(){
  log "build backend"
  cd backend
  docker build -t lindsay_app_backend .
  cd $HOME
}

function buildFrontend(){
  # TODO
  log "Build front end"
  cd frontend
  ./build.sh
  cd $HOME
}

function buildRedis(){
  log "build redis"
  cd infrastructure/redis
  ./build_redis_images.sh
  cd $HOME
}

function buildNginxIngress(){
  log "build ingress"
  cd infrastructure/nginx-ingress
  docker build . -f Dockerfile.NginxIngress -t lindsay-ingress
  cd $HOME
}

function nodeVersion(){
  nVersion=$(node --version)
  echo $nVersion > ./NODE_VERSION
}

function pythonVersion(){
  pVersion=$(python3 --version)
  echo $pVersion > ./PYTHON_VERSION
}

log "BEGIN BUILDING EVERYTHING"
nodeVersion
pythonVersion
buildBackend
buildFrontend
buildRedis
buildNginxIngress
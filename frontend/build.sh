#! /bin/bash

function rotateEnvFile(){
  rm lindsay-wildlife-treasure-hunt-frontend/src/src/conf/env/env.js
  touch lindsay-wildlife-treasure-hunt-frontend/src/src/conf/env/env.js
}

function createEnvFile(){
  rotateEnvFile

  environment=$1

  echo "export let env = \"${environment}\"" >> "lindsay-wildlife-treasure-hunt-frontend/src/src/conf/env/env.js"
  echo "export default {env};" >> "lindsay-wildlife-treasure-hunt-frontend/src/src/conf/env/env.js"
}

HOME=$(pwd)

envToDeploy=${DEPLOY_ENV:-local}

echo "ENV TO DEPLOY TO: '${envToDeploy}'"

createEnvFile $envToDeploy

cd lindsay-wildlife-treasure-hunt-frontend

rm -rf docker/tmp
mkdir docker/tmp

./scripts/build.sh

cd $HOME

cp -r lindsay-wildlife-treasure-hunt-frontend/build/ docker/tmp

cd docker 
docker build . -f Dockerfile.ReactApp -t lindsay-react-app \
--no-cache --platform ${DOCKER_DEFAULT_PLATFORM}

cd $HOME 

createEnvFile "local"
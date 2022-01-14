#! /bin/bash

HOME=$(pwd)

cd lindsay-wildlife-treasure-hunt-frontend

rm -rf docker/tmp
mkdir docker/tmp

./scripts/build.sh

cd $HOME

cp -r lindsay-wildlife-treasure-hunt-frontend/build/ docker/tmp

cd docker 
docker build . -f Dockerfile.ReactApp -t lindsay-react-app --no-cache
cd $HOME 
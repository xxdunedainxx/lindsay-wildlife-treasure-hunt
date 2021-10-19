#! /bin/bash

HOME=$(pwd)

cd frontend

rm -rf docker/tmp
mkdir docker/tmp

cd docker 
docker build . -f Dockerfile.ReactApp -t lindsay-react-app
cd $HOME 

cp -r lindsay-wildlife-treasure-hunt-frontend/build/ docker/tmp

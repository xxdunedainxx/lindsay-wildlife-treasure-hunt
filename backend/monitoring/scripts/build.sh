#! /bin/bash

HOME=$(pwd)

cd ..

docker build -t lindsay_app_monitoring -f monitoring/Dockerfile.Monitoring .

cd $HOME
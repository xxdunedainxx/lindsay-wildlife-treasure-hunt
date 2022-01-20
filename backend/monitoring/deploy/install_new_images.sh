#! /bin/bash

echo "Prune back old images"

docker image prune -f

echo "Loading new images"

docker load < lindsay_app_monitoring.tar.gz

echo "done loading new images"

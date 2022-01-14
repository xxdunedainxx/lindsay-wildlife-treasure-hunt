#! /bin/bash

echo "Prune back old images"

docker image prune -f

echo "Loading new images"

docker load < lindsay-ingress.tar.gz
docker load < lindsay-react-app.tar.gz
docker load < lindsay-redis-server.tar.gz
docker load < lindsay_app_backend.tar.gz
docker load < lindsay-static-assets.tar.gz

echo "done loading new images"

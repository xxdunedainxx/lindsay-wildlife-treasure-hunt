#! /bin/bash

echo "Loading new images"

docker load < lindsay-ingress.tar.gz
docker load < lindsay-react-app.tar.gz
docker load < lindsay-redis-server.tar.gz
docker load < lindsay_app_backend.tar.gz

echo "done loading new images"

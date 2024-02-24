#! /bin/bash

mkdir -p logs

docker-compose down --remove-orphans || echo "Docker compose not running, no need to tear down"

docker-compose up -d

echo "Access at http://localhost/ui"
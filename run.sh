#! /bin/bash

docker-compose down || echo "Docker compose not running, no need to tear down"

docker-compose up -d
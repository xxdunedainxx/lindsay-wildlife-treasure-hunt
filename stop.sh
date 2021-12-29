#! /bin/bash

docker-compose down --remove-orphans || echo "Docker compose not running, no need to tear down"

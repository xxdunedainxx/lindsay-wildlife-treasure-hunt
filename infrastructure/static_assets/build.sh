#! /bin/bash

docker build . -f Dockerfile.StaticAssets -t lindsay-static-assets --platform ${DOCKER_DEFAULT_PLATFORM}
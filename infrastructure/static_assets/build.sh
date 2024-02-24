#! /bin/bash

docker build . -f Dockerfile.StaticAssets -t lindsay-static-assets --build-arg="ARCH=${DOCKER_ARCH}" --platform ${DOCKER_DEFAULT_PLATFORM}
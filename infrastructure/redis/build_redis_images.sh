#! /bin/bash

function buildRedisServer(){
	cd server
	docker build  -t lindsay_redis_server -f Dockerfile.RedisServer --build-arg="ARCH=${DOCKER_ARCH}" --platform ${DOCKER_DEFAULT_PLATFORM} . 
	cd ..
}

function buildRedisCommander(){
	docker pull rediscommander/redis-commander:latest 
}

buildRedisServer
buildRedisCommander
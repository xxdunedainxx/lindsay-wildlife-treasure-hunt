#! /bin/sh

function buildRedisServer(){
	cd server
	docker build -f Dockerfile.RedisServer -t redis-server . 
	cd ..
}

function buildRedisCommander(){
	docker pull rediscommander/redis-commander:latest
}

buildRedisServer
buildRedisCommander
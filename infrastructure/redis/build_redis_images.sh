#! /bin/bash

function buildRedisServer(){
	cd server
	docker build  -t lindsay_redis_server -f Dockerfile.RedisServer . 
	cd ..
}

function buildRedisCommander(){
	docker pull rediscommander/redis-commander:latest
}

buildRedisServer
buildRedisCommander
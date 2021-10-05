#! /bin/bash

YOUR_IP="172.19.0.1"

function runRedisServer(){
	# Runs the GUI alongside the redis cluster
	docker kill lindsay_redis_server || echo "no redis server"
	docker rm lindsay_redis_server || echo "no redis server"
	docker run --name redis-server -d -p 6379:6379 lindsay_redis_server
}

function runRedisCommander(){
	docker kill redis-commander || echo "no redis commander"
	docker rm redis-commander || echo "no redis commander"
	docker run --name redis-commander -d   --env REDIS_HOSTS="${YOUR_IP}"   -p 8081:8081   rediscommander/redis-commander:latest
}

runRedisServer
runRedisCommander
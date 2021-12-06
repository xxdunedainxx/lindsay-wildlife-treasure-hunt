#! /bin/bash

YOUR_IP="10.77.159.233"

function runRedisServer(){
	# Runs the GUI alongside the redis cluster
	docker kill lindsay_redis_server || echo "no redis server"
	docker rm lindsay_redis_server || echo "no redis server"
	docker run --name lindsay_redis_server -d -p 6379:6379 lindsay_redis_server
}

function runRedisCommander(){
	docker kill redis-commander || echo "no redis commander"
	docker rm redis-commander || echo "no redis commander"
	docker run --name redis-commander -d   --env REDIS_HOSTS="${YOUR_IP}"   -p 8081:8081   rediscommander/redis-commander:latest
}

function checkRedisConnection() {
  nc -z localhost 6379
  if [[ $? != 0 ]];
  then
    echo "Issue spinning up redis?"
  else
    echo "Redis is up and connected!"
  fi
}

runRedisServer
runRedisCommander
checkRedisConnection

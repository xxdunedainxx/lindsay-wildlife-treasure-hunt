#! /bin/sh

docker kill redis-server || echo "no redis server"
docker rm redis-server || echo "no redis server"

docker kill redis-commander || echo "no redis commander"
docker rm redis-commander || echo "no redis commander"
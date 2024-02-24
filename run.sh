#! /bin/bash
# ssh ec2-user@54.189.162.127  -i ~/.ssh/lindsay_server_2.pem -v
mkdir -p logs

docker-compose down --remove-orphans || echo "Docker compose not running, no need to tear down"

docker-compose up -d

echo "Access at http://localhost/ui"
#! /bin/bash

HOME=$(pwd)

if [ -f "./deployment/INSTANCE.txt" && -f "./deployment/SSH_KEY_PATH.txt" ];then
  read -p "Please provide your AWS EC2 instance:" AWS_EC2_INSTANCE
  read -p "Please specify the path of your SSH Key" SSH_KEY_PATH

  echo "${AWS_EC2_INSTANCE}" > "./deployment/INSTANCE.txt"
  echo "${SSH_KEY_PATH}"     > "./deployment/SSH_KEY_PATH.txt"
else
  AWS_EC2_INSTANCE=$(cat "./deployment/INSTANCE.txt")
  SSH_KEY_PATH=$(cat "./deployment/SSH_KEY_PATH.txt")
fi

./build.sh

mkdir deployment/images

echo "Bundling latest docker images in deployment/images"

docker save lindsay-ingress:latest | gzip > deployment/images/lindsay-ingress.tar.gz
docker save lindsay-react-app:latest | gzip > deployment/images/lindsay-react-app.tar.gz
docker save lindsay_app_backend:latest | gzip > deployment/images/lindsay_app_backend.tar.gz
docker save lindsay-redis-server:latest | gzip > deployment/images/lindsay-redis-server.tar.gz

# Upload steps

echo "Uploading docker files..."
scp -v -i "${SSH_KEY_PATH}" "deployment/images/lindsay-ingress.tar.gz" "ec2-user@${AWS_EC2_INSTANCE}":~/ 
scp -v -i "${SSH_KEY_PATH}" "deployment/images/lindsay-react-app.tar.gz" "ec2-user@${AWS_EC2_INSTANCE}":~/ 
scp -v -i "${SSH_KEY_PATH}" "deployment/images/lindsay-redis-server.tar.gz" "ec2-user@${AWS_EC2_INSTANCE}":~/ 
scp -v -i "${SSH_KEY_PATH}" "deployment/images/lindsay_app_backend.tar.gz" "ec2-user@${AWS_EC2_INSTANCE}":~/ 

echo "Publishing docker compose"
scp -v -i "${SSH_KEY_PATH}" "docker-compose.yml" "ec2-user@${AWS_EC2_INSTANCE}":~/

echo "Publishing util scripts"
scp -v -i "${SSH_KEY_PATH}" "deployment/setup/install_new_images.sh" "ec2-user@${AWS_EC2_INSTANCE}":~/
scp -v -i "${SSH_KEY_PATH}" "deployment/setup/docker_setup.sh" "ec2-user@${AWS_EC2_INSTANCE}":~/
scp -v -i "${SSH_KEY_PATH}" "run.sh" "ec2-user@${AWS_EC2_INSTANCE}":~/
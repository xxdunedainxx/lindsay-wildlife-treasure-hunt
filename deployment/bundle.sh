#! /bin/bash

APPLICATION_DEPLOYMENT_PATH=/home/lindsay-wildlife-app/app
HOME=$(pwd)

if [[ ! -f "./deployment/INSTANCE.txt" || ! -f "./deployment/SSH_KEY_PATH.txt" || ! -f "./deployment/USERNAME.txt" ]] ;then
  read -p "Please provide your AWS EC2 instance:" AWS_EC2_INSTANCE
  read -p "Please specify the path of your SSH Key" SSH_KEY_PATH
  read -p "Please specify your username" USERNAME

  echo "${AWS_EC2_INSTANCE}" > "./deployment/INSTANCE.txt"
  echo "${SSH_KEY_PATH}"     > "./deployment/SSH_KEY_PATH.txt"
  echo "${USERNAME}"         > "./deployment/USERNAME.txt"
else
  AWS_EC2_INSTANCE=$(cat "./deployment/INSTANCE.txt")
  SSH_KEY_PATH=$(cat "./deployment/SSH_KEY_PATH.txt")
  USERNAME=$(cat "./deployment/USERNAME.txt")
fi

./build.sh

mkdir deployment/images

echo "Bundling latest docker images in deployment/images"

docker save lindsay-ingress:latest | gzip > deployment/images/lindsay-ingress.tar.gz
docker save lindsay-react-app:latest | gzip > deployment/images/lindsay-react-app.tar.gz
docker save lindsay_app_backend:latest | gzip > deployment/images/lindsay_app_backend.tar.gz
docker save lindsay_redis_server:latest | gzip > deployment/images/lindsay_redis_server.tar.gz
docker save lindsay-static-assets:latest | gzip > deployment/images/lindsay-static-assets.tar.gz

# Upload steps

echo "Running initial user / FS setup"
scp -v -i "${SSH_KEY_PATH}" "deployment/setup/file_and_users.sh" "${USERNAME}@${AWS_EC2_INSTANCE}":~/
ssh "${USERNAME}@${AWS_EC2_INSTANCE}" -i "${SSH_KEY_PATH}" -- """\
./file_and_users.sh;
"""

echo "Uploading docker files..."
scp -v -i "${SSH_KEY_PATH}" "deployment/images/lindsay-ingress.tar.gz" "${USERNAME}@${AWS_EC2_INSTANCE}":"${APPLICATION_DEPLOYMENT_PATH}/lindsay-ingress.tar.gz"
scp -v -i "${SSH_KEY_PATH}" "deployment/images/lindsay-react-app.tar.gz" "${USERNAME}@${AWS_EC2_INSTANCE}":"${APPLICATION_DEPLOYMENT_PATH}/lindsay-react-app.tar.gz"
scp -v -i "${SSH_KEY_PATH}" "deployment/images/lindsay_redis_server.tar.gz" "${USERNAME}@${AWS_EC2_INSTANCE}":"${APPLICATION_DEPLOYMENT_PATH}/lindsay_redis_server.tar.gz"
scp -v -i "${SSH_KEY_PATH}" "deployment/images/lindsay_app_backend.tar.gz" "${USERNAME}@${AWS_EC2_INSTANCE}":"${APPLICATION_DEPLOYMENT_PATH}/lindsay_app_backend.tar.gz"
scp -v -i "${SSH_KEY_PATH}" "deployment/images/lindsay-static-assets.tar.gz" "${USERNAME}@${AWS_EC2_INSTANCE}":"${APPLICATION_DEPLOYMENT_PATH}/lindsay-static-assets.tar.gz"

echo "Publishing docker compose"
scp -v -i "${SSH_KEY_PATH}" "docker-compose.yml" "${USERNAME}@${AWS_EC2_INSTANCE}":"${APPLICATION_DEPLOYMENT_PATH}/docker-compose.yml"

echo "Publishing util scripts"
scp -v -i "${SSH_KEY_PATH}" "deployment/setup/install_new_images.sh" "${USERNAME}@${AWS_EC2_INSTANCE}":"${APPLICATION_DEPLOYMENT_PATH}"
scp -v -i "${SSH_KEY_PATH}" "deployment/setup/docker_setup.sh" "${USERNAME}@${AWS_EC2_INSTANCE}":"${APPLICATION_DEPLOYMENT_PATH}"
scp -v -i "${SSH_KEY_PATH}" "run.sh" "${USERNAME}@${AWS_EC2_INSTANCE}":"${APPLICATION_DEPLOYMENT_PATH}"
scp -v -i "${SSH_KEY_PATH}" "prod.conf.json" "${USERNAME}@${AWS_EC2_INSTANCE}":"${APPLICATION_DEPLOYMENT_PATH}"

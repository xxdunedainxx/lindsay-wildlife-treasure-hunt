#! /bin/bash

HOME=$(pwd)

APPLICATION_DEPLOYMENT_PATH=/home/ec2-user

./scripts/build.sh

function bundle(){
  mkdir images
  echo "Bundling latest docker images in images"
  docker save lindsay_app_monitoring:latest | gzip > images/lindsay_app_monitoring.tar.gz
}


if [[ ! -f "./deploy/INSTANCE.txt" || ! -f "./deploy/SSH_KEY_PATH.txt" || ! -f "./deploy/USERNAME.txt" ]] ;then
  read -p "Please provide your AWS EC2 instance:" AWS_EC2_INSTANCE
  read -p "Please specify the path of your SSH Key" SSH_KEY_PATH
  read -p "Please specify your username" USERNAME

  echo "${AWS_EC2_INSTANCE}" > "./deploy/INSTANCE.txt"
  echo "${SSH_KEY_PATH}"     > "./deploy/SSH_KEY_PATH.txt"
  echo "${USERNAME}"         > "./deploy/USERNAME.txt"
else
  AWS_EC2_INSTANCE=$(cat "./deploy/INSTANCE.txt")
  SSH_KEY_PATH=$(cat "./deploy/SSH_KEY_PATH.txt")
  USERNAME=$(cat "./deploy/USERNAME.txt")
fi

bundle

echo "Uploading docker files..."
scp -v -i "${SSH_KEY_PATH}" "images/lindsay_app_monitoring.tar.gz" "${USERNAME}@${AWS_EC2_INSTANCE}":"${APPLICATION_DEPLOYMENT_PATH}"


echo "Publishing util scripts"
scp -v -i "${SSH_KEY_PATH}" "setup/install_new_images.sh" "${USERNAME}@${AWS_EC2_INSTANCE}":"${APPLICATION_DEPLOYMENT_PATH}"
scp -v -i "${SSH_KEY_PATH}" "setup/docker_setup.sh" "${USERNAME}@${AWS_EC2_INSTANCE}":"${APPLICATION_DEPLOYMENT_PATH}"
scp -v -i "${SSH_KEY_PATH}" "run.sh" "${USERNAME}@${AWS_EC2_INSTANCE}":"${APPLICATION_DEPLOYMENT_PATH}"
scp -v -i "${SSH_KEY_PATH}" "conf.json" "${USERNAME}@${AWS_EC2_INSTANCE}":"${APPLICATION_DEPLOYMENT_PATH}"
scp -v -i "${SSH_KEY_PATH}" "monitoring.conf.json" "${USERNAME}@${AWS_EC2_INSTANCE}":"${APPLICATION_DEPLOYMENT_PATH}"

ssh "${USERNAME}@${AWS_EC2_INSTANCE}" -i "${SSH_KEY_PATH}" -- """\
cd ${APPLICATION_DEPLOYMENT_PATH};
${APPLICATION_DEPLOYMENT_PATH}/docker_setup.sh;
${APPLICATION_DEPLOYMENT_PATH}/install_new_images.sh;
${APPLICATION_DEPLOYMENT_PATH}/run.sh;
"""

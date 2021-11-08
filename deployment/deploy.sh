#! /bin/bash

APPLICATION_DEPLOYMENT_PATH=/home/lindsay-wildlife-app/app

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

HOME=$(pwd)

./deployment/bundle.sh

echo "DEPLOYING"

ssh "${USERNAME}@${AWS_EC2_INSTANCE}" -i "${SSH_KEY_PATH}" -- """\
cd ${APPLICATION_DEPLOYMENT_PATH};
${APPLICATION_DEPLOYMENT_PATH}/docker_setup.sh;
${APPLICATION_DEPLOYMENT_PATH}/install_new_images.sh;
${APPLICATION_DEPLOYMENT_PATH}/run.sh;
"""

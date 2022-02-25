#! /bin/bash

HOME=$(pwd)

cd backend

./scripts/setup.sh

cd $HOME

cd frontend/lindsay-wildlife-treasure-hunt-frontend

./scripts/setup.sh

cd $HOME
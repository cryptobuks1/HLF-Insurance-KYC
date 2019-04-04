#!/bin/bash

set -ev

cd tarp-chaincode
./start.sh && ./install.sh
sleep 3

cd ../tarp-client/src
npm install
./scripts/set-up-client.sh
nohup nodemon >> server.log 2>&1 &

# 10 seconds to wait for server to start
sleep 10
cd ../../tarp-ui
# npm install
nohup npm run start >> frontend.log 2>&1 &

sleep 10

cd ../tarp-client/src

echo "================Registering user================"
node ./scripts/register-user.js
echo "-------------------------------------------------"

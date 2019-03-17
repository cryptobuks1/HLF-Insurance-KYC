#!/bin/bash

set -ev

cd kyc-chaincode
./start.sh && ./install.sh
sleep 3
cd ..
cd kyc-client/src
# npm install
./scripts/set-up-client.sh
node app.js

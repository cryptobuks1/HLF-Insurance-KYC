#!/bin/bash

set -ev

cd tarp-chaincode
./start.sh && ./install.sh
sleep 3
cd ..
cd tarp-client/src
# npm install
./scripts/set-up-client.sh
node app.js

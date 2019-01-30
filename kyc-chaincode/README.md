# Insurance Network Config

Find the chaincode documentation [here](./API.md)
The bash files with their function are described below <br>
- ``start.sh`` - Starts the network from docker compose, creates a channel, adds a peer to the channel
- ``install.sh`` - Installs and Instantiates the channel for development with version 'v0'
- ``generate.sh`` - Generates the certificates for the network
- ``stop.sh`` - Stops currently running docker containers
- ``teardown.sh`` - Completely removes all images and containers 
- ``update.sh`` - Generates a random version number(for development sakes), installs and upgrades the new chaincode for version
- ``test.sh`` - Tests for all possible chaincode API calls, currently only consider successfull cases
- ``restart.sh`` - Basically restarts containers and redeploys them and  installs and instantiates the chaincode
- ``restartandtest.sh`` - Combination of restart and test, cause I'm lazy.


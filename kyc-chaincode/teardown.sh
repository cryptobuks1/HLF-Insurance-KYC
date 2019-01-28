#!/bin/bash
#
# Copyright IBM Corp All Rights Reserved
#
# SPDX-License-Identifier: Apache-2.0
#
# Exit on first error, print all commands.
set -e

# Shut down the Docker containers for the system tests.
docker-compose -f docker-compose.yml kill && docker-compose -f docker-compose.yml down

# remove the local state
rm -f ~/.hfc-key-store/*

# remove the stopped dev docker containers
docker rm -f $(docker ps -aq --filter name=dev-peer)

# remove chaincode docker images
docker rmi $(docker images dev-* -q)

# Your system is now clean

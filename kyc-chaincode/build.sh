#!/bin/bash
set -ev
source .env
rm -r $CC_BUILD_PATH
mkdir -p $CC_BUILD_PATH
cp -rf $PWD/chaincode/* $CC_BUILD_PATH
cd $CC_BUILD_PATH
go build -v


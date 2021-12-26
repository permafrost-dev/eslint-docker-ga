#!/bin/bash

docker build -t permafrostsoftware/eslint-docker-ga .

if [ "$1" == "--push" ]; then
    docker push permafrostsoftware/eslint-docker-ga:latest
fi

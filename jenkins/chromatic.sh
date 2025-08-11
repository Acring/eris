#!/bin/bash

WORKSPACE=$PWD

NODE_GIT_IMAGE="harbor.xsky.com/pluto/node-alpine-git:latest"

start()
{
    echo 'deploy storybook to chromatic'
    docker image rm ${NODE_GIT_IMAGE}

    docker run \
        --rm \
        -v $WORKSPACE:/code \
        -e CHROMATIC_PROJECT_TOKEN=$CHROMATIC_PROJECT_TOKEN \
        -w /code \
        --shm-size="2g" \
        ${NODE_GIT_IMAGE} \
        /bin/sh -c 'yarn workspace storybook chromatic'
}

start
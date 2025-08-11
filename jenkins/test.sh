#!/bin/bash

WORKSPACE=$PWD

PLAYWRIGHT_IMAGE="harbor.xsky.com/pluto/playwright:v1.40.1-jammy"

start()
{
    echo 'test storybook'
    docker run \
        --rm \
        -v $WORKSPACE:/code \
        -w /code \
        -e "TURBO_API=$TURBO_API" \
        -e "TURBO_TEAM=$TURBO_TEAM" \
        -e "TURBO_TOKEN=$TURBO_TOKEN" \
        --shm-size="2g" \
        ${PLAYWRIGHT_IMAGE} \
        /bin/sh -c 'yarn test'

}

start
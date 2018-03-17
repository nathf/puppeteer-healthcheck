#!/bin/sh
docker build -t nathf/puppeteer-healthcheck:${CIRCLE_TAG:1} .
docker login -u $DOCKER_USER -p $DOCKER_PASS
docker push nathf/puppeteer-healthcheck:${CIRCLE_TAG:1}

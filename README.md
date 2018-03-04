# Puppeteer Healthcheck
Puppeteer Healthcheck is a simple tool wrapped over [puppeteer](https://github.com/GoogleChrome/puppeteer) to check page and critical asset status', as well as checks for key dom elements.

## The Problem
Often post deploy we want to check our site/app has been deployed sucessfully. We would want to ensure the web server is responding, critical assets and certain DOM elements exists post deploy.

## Requirements & Installing

Node requirements:
- v8.9.4

Installing:
For the node API
```
yarn add global @nathf/puppeteer-healthcheck
# or if you prefer NPM
npm i -g @nathf/puppeteer-healthcheck
```

## Config
TODO


### TODOS
 - [ ] Write sample config
 - [ ] Set up npm publishing
 - [ ] Set up dockerhub publishing
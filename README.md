# Puppeteer Healthcheck
Puppeteer Healthcheck is a simple tool wrapped over [puppeteer](https://github.com/GoogleChrome/puppeteer) to check page and critical asset status', as well as checks for key dom elements.

[![nodesource/node](http://dockeri.co/image/nathf/puppeteer-healthcheck)](https://hub.docker.com/r/nathf/puppeteer-healthcheck/)

## The Problem
Often post deploy we want to check our site/app has been deployed sucessfully. We would want to ensure the web server is responding, critical assets and certain DOM elements exists post deploy.

## Requirements & Installing

Node requirements:
- v8.9.4

NPM
```
yarn add global @nathf/puppeteer-healthcheck
# or if you prefer NPM
npm i -g @nathf/puppeteer-healthcheck
```

Docker
```
docker pull nathf/puppeteer-healthcheck
```

## Config

Example command with config
```
puppeteer-healthcheck --config healthcheck.config.js
```

### Config schema breakdown

#### `uri: string`

The page you want to test.

#### `assetRegex: string[]`

A list of regex strings to match assets on

e.g.

```js
assetRegex: [
  'script-(.+)\.js',
  'style-(.+)\.css'
]
```

#### `screenshots: Screenshot[]`

A screenshot object consists of:

[List of full options for screenshots](https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md#pagescreenshotoptions)

* `path: string`: absolute path to save the screenshot
* `fullPage: boolean`:  takes a screenshot of the full scrollable page
* `viewport` [Puppeteer reference](https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md#pagesetviewportviewport)

 
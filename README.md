[![NPM](https://img.shields.io/npm/v/@nathf/puppeteer-healthcheck.svg)](https://www.npmjs.com/package/@nathf/puppeteer-healthcheck)
![CircleCI branch](https://img.shields.io/circleci/project/github/nathf/puppeteer-healthcheck/master.svg)
![Docker Build Status](https://img.shields.io/docker/build/nathf/puppeteer-healthcheck.svg)

# Puppeteer Healthcheck
Puppeteer Healthcheck is a tool wrapped over [puppeteer](https://github.com/GoogleChrome/puppeteer) to check page and critical asset status'.

## The Problem
Often post deploy we want to check our site/app has been deployed sucessfully. We would want to ensure the web server is responding, critical assets and certain DOM elements exists post deploy.

## An Example

An example config checking the GitHub login page, checking their hashed css and js and taking screenshots at various sizes.

```js
// healthcheck.config.js
module.exports = {
  uri: 'https://github.com/login',
  assetRegex: [
    'github-(.+)\.js',
    'github-(.+)\.css',
  ],
  screenshots: [
    {
      path: `${__dirname}/desktop.png`,
      viewport: {
        width: 800,
        height: 300
      }
    },
    {
      path: `${__dirname}/fullpage.png`,
      fullPage: true
    },
    {
      path: `${__dirname}/narrow.png`,
      viewport: {
        width: 375,
        height: 667
      }
    }
  ]
}
```

Results in the following output:

<img src="https://user-images.githubusercontent.com/646098/37132139-4c560692-22e0-11e8-9535-12716394fe4d.png" />


## Requirements & Installing

Node requirements:
- v8.9.4

NPM
```bash
yarn add global @nathf/puppeteer-healthcheck
# or if you prefer NPM
npm i -g @nathf/puppeteer-healthcheck
```

Docker
```bash
docker pull nathf/puppeteer-healthcheck
```

## Config

Example command with config
```bash
puppeteer-healthcheck --config healthcheck.config.js
```

### Config schema breakdown

#### `uri: string`

Valid URI to check

#### `wait: number`

Milliseconds to wait before requesting the URI

#### `assetRegex: string[]`

List of regex strings to match asset URLs

e.g.

```js
assetRegex: [
  'script-(.+)\.js',
  'style-(.+)\.css'
]
```

#### `authentication: Authentication`

Authenticate via HTTP or a login page

Authentication object consists of:
* `type: string`: The type of authentication you wish to perform. Either 'http' or 'page'.
* `uri: ?string`: An optional string to run authentication against, if omitted authentication will run against the base URI.
* `credentials: Object`: An object containing relevent information for each authentication type.
  * `username: string`: username for login
  * `password: string`: password for login

**Note** for Page authentication, the keys in the credentials object are the corresponding page elements

#### `screenshots: Screenshot[]`

Screenshot object consists of:

[These options are referenced from the official Puppeteer Docs](https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md#pagescreenshotoptions)

* `path: string`: absolute path to save the screenshot
* `type: string`: Specify screenshot type, can be either `jpeg` or `png`. Defaults to 'png'.
* `quality: number`: The quality of the image, between 0-100. Not applicable to png images.
* `fullPage: boolean`: When true, takes a screenshot of the full scrollable page. Defaults to `false`.
* `clip: Object`: An object which specifies clipping region of the page. Should have the following fields:
  * `x: number`: x-coordinate of top-left corner of clip area
  * `y: number`: y-coordinate of top-left corner of clip area
  * `width: number`: width of clipping area
  * `height: number`: height of clipping area
* `omitBackground: boolean`: Hides default white background and allows capturing screenshots with transparency. Defaults to false.
* `viewport: Object` [Referenced from Puppeteer docs](https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md#pagesetviewportviewport)
  * `width: number`: page width in pixels.
  * `height: number` page height in pixels.
  * `deviceScaleFactor: numer`: Specify device scale factor (can be thought of as dpr). Defaults to `1`.
  * `isMobile: boolean`: Whether the `meta` viewport tag is taken into account. Defaults to `false`.
  * `hasTouch: boolean`: Specifies if viewport supports touch events. Defaults to `false`
  * `isLandscape: boolean`: Specifies if viewport is in landscape mode. Defaults to `false`.
#!/usr/bin/env node
const path = require('path');
const yargs = require('yargs');
const cli = require('../lib/puppeteer-healthcheck');

const argv = yargs
  .usage('Usage: $0 --uri <uri-to-check>')
  .option('uri', {
    alias: 'u',
    describe: 'Valid URI to check',
    requiresArg: true
  })
  .option('config', {
    describe: 'Pass in a JavaScript file with all the config.',
    requiresArg: true
  })
  .option('assetRegex', {
    alias: 'r',
    describe: 'Regex string to match asset URLs',
    requiresArg: true
  })
  .option('assetCount', {
    alias: 'c',
    describe: 'The amount of assets you expect to be found',
    requiresArg: true
  })
  .option('wait', {
    alias: 'w',
    describe: 'Milliseconds to wait before requesting the URI',
    requiresArg: true
  }).argv;

process.on('unhandledRejection', err => {
  throw err;
});

let config = argv;
if (argv.config) {
  config = require(path.resolve(process.cwd(), argv.config));
}

cli.run(config);

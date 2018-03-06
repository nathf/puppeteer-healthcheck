#!/usr/bin/env node
const path = require('path');
const yargs = require('yargs');
const cli = require('../lib/puppeteer-healthcheck');

const argv = yargs
  .usage('Usage: $0 --config <relative-path-to-config>')
  .option('config', {
    alias: 'c',
    describe: 'Relative path to the healthcheck config file',
    requiresArg: true
  })
  .option('uri', {
    alias: 'u',
    describe: 'Valid URI to check',
    requiresArg: true
  })
  .option('assetRegex', {
    alias: 'r',
    describe: 'List of regex strings to match asset URLs',
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

cli.run(config).catch(() => process.exit(1));

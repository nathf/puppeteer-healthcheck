#!/usr/bin/env node
const yargs = require('yargs');
const cli = require('../lib/puppeteer-healthcheck');

const argv = yargs
  .usage('Usage: $0 --uri <uri-to-check>')
  .option('uri', {
    alias: 'u',
    describe: 'Valid URI to check',
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
  })
  .demandOption(['uri']).argv;

process.on('unhandledRejection', err => {
  throw err;
});

let opts = argv;
if (process && process.env.CHROME_EXECUTABLE_PATH) {
  opts = Object.assign({}, opts, {
    chromeExecutablePath: process.env.CHROME_EXECUTABLE_PATH,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
}
console.log({opts});
cli.run(opts);

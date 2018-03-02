// @flow
const puppeteer = require('puppeteer');
const colors = require('ansi-colors');

import log from './log';
import assetChecks from './assetChecks';

/*::
type Options = {
  uri: string,
  wait?: number,
  assetRegex?: ?string,
  assetCount?: number,
  chromeExecutablePath?: ?string
}
*/

function exit() {
  log.error('Exiting...');
  process.exit(1);
}

async function sleep(ms /*: number */) {
  log.info(`Sleeping for ${ms}ms`);
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function run(opts /*: Options */) {
  if (opts.wait) {
    await sleep(opts.wait);
  }

  const foundAssets = new Set();
  const failedAssets = new Set();
  let browser;
  let page;

  let launchOpts = {}
  if (opts.chromeExecutablePath) {
    launchOpts = {
      executablePath: opts.chromeExecutablePath
    }
  }

  try {
    browser = await puppeteer.launch(launchOpts);
    page = await browser.newPage();
  } catch (e) {
    log.error(`Error occursed while booting the browser: ${e.message}`);
    return exit();
  }

  log.info(`Requesting ${colors.yellow(opts.uri)}`);

  if (opts.assetRegex) {
    const resouceMatchRegex = new RegExp(opts.assetRegex, 'g');

    log.info(`Asset regex ${colors.yellow(resouceMatchRegex)}`);

    const checks = assetChecks(
      opts.assetRegex,
      opts.uri,
      foundAssets,
      failedAssets
    );
    page.on('requestfailed', checks.requestfailed);
    page.on('requestfinished', checks.requestfinished);
    page.on('error', checks.error);
  }

  try {
    await page.goto(opts.uri);
    log.success('Page loaded OK');
  } catch (e) {
    log.error(`Failed to load the page: ${colors.yellow(e.message)}`);
    return exit();
  }

  try {
    log.info('Closing browser...');
    await browser.close();
  } catch (e) {
    log.error(`Error occured while closing the browser: ${e.message}`);
    return exit();
  }

  if (opts.assetCount && foundAssets.size !== opts.assetCount) {
    // TODO need to keep track of which assets didnt get matched.
    log.error(
      `Expected to find ${opts.assetCount || ''} asset(s), instead found ${
        foundAssets.size
      }`
    );
    log.error('Assets that matched:');
    foundAssets.forEach(asset => {
      log.error(`  - ${asset.url}`);
    });

    return exit();
  }

  if (failedAssets.size) {
    log.error('Some assets failed to load...');
    failedAssets.forEach(asset => {
      log.error(`\t- ${asset.url}`);
    });

    return exit();
  }

  log.success('Everything OK!');
}

export default { run };

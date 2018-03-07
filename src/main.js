// @flow
const puppeteer = require('puppeteer');
const colors = require('ansi-colors');

import log from './log';
import { assetChecks, printAssetRegexStats, isFailedAsset } from './assetChecks';
import processScreenshots from './screenshot';

/*::
import type { FoundAsset, FailedAsset } from './assetChecks';
import type { ScreenshotOpts } from './screenshot';
type Options = {
  uri: string,
  wait?: number,
  assetRegex?: ?string[],
  screenshots?: ScreenshotOpts[],
  logger?: () => void
}
*/

async function sleep(ms /*: number */, logger) {
  logger.info(`Sleeping for ${ms}ms`);
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function run(opts /*: Options */)/*: Promise<[Set<FoundAsset>, Set<FailedAsset>]>*/ {
  const logger = log(opts.logger);
  // Add leading slash to uri if missing
  const uri = (opts.uri || '').replace(/\/?$/, '/');


  if (opts.wait) {
    await sleep(opts.wait, logger);
  }

  return new Promise(async (resolve, reject) => {
    const foundAssets/*: Set<FoundAsset> */ = new Set();
    const failedAssets/*: Set<FailedAsset> */ = new Set();
    let browser;
    let page;

    try {
      browser = await puppeteer.launch({
        args: ['--no-sandbox', '--disable-setuid-sandbox']
      });
      page = await browser.newPage();
    } catch (e) {
      logger.error(`Error occursed while booting the browser: ${e.message}`);
      return reject();
    }

    logger.info(`Requesting ${colors.yellow(uri)}`);

    const assetRegexStats = new Map();

    const checks = assetChecks(
      opts.assetRegex || [],
      uri,
      foundAssets,
      failedAssets,
      assetRegexStats,
      opts.logger
    );
    page.on('requestfailed', checks.requestfailed);
    page.on('requestfinished', checks.requestfinished);
    page.on('error', checks.error);

    try {
      await page.goto(uri);
    } catch (e) {
      logger.error(`Failed to load the page: ${colors.yellow(e.message)}`);
      return reject();
    }

    if (!isFailedAsset(uri, failedAssets)) {
      printAssetRegexStats(assetRegexStats, logger);
    }

    if (opts.screenshots) {
      await processScreenshots(page, opts.screenshots, opts.logger);
    }

    try {
      logger.info('Closing browser...');
      await browser.close();
    } catch (e) {
      logger.error(`Error occured while closing the browser: ${e.message}`);
      return reject();
    }

    if (failedAssets.size) {
      logger.error('Some assets failed to load...');
      failedAssets.forEach(asset => {
        logger.error(`\t- ${asset.url}`);
      });

      return reject([foundAssets, failedAssets]);
    }

    resolve([foundAssets, failedAssets]);
  });
}

export default { run };

//@flow
const colors = require('ansi-colors');
const { URL } = require('url');

import logger from './log';

/*::
export type FoundAsset = {
  url: string,
  status: string
}

export type FailedAsset = {
  url: string,
  error: string
}
*/

const match = (subject/*: string */, regexSet/*: Set<RegExp>*/, regexStats/*: Map<RegExp, number>*/) => {
  let matched = false;

  // $FlowFixMe
  const iterator = regexSet[Symbol.iterator]();

  let current = iterator.next();
  while (!current.done) {
    const regex = current.value;
    const result = subject.match(regex);

    if (result) {
      matched = !!result;
      regexStats.set(regex, regexStats.get(regex) + 1);
    }

    current = iterator.next();
  }

  return matched;
}

export const assetChecks = (
  regex /*: string[] */,
  requestedUrl /*: string */,
  foundAssets /*: Set<FoundAsset> */,
  failedAssets /*: Set<FailedAsset> */,
  assetRegexStats /*: Map<RegExp, number>*/
) => {

  // If regex is not an array, convert it to one.
  if (!Array.isArray(regex)) {
    regex = [regex];
  }

  const regexSet = new Set(regex.map(r => {
    const regexp = new RegExp(r, 'g');
    assetRegexStats.set(regexp, 0)
    return regexp;
  }));

  logger.info(`Asset regex`);
  regexSet.forEach(v => logger.info(` - ${v.toString()}`));

  return {
    requestfailed: (request /*: any */) => {
      const url = request.url();

      if (match(request.url(), regexSet, assetRegexStats)) {
        const failure = request.failure();
        const error = (failure && failure.errorText) || 'Unknown';
        const response = request.response();
        const status = (response && response.status()) || 'Unknown';

        logger.error(`${status}: ${url}`);
        logger.error(`Reason: ${error}`);

        failedAssets.add({ url, error });
      }
    },
    requestfinished: (request /*: any */) => {
      const url = request.url();
      if (url === requestedUrl) {
        logger.success(`Document loaded OK`);
      }

      if (match(request.url(), regexSet, assetRegexStats)) {
        const response = request.response();
        const status = (response && response.status());

        // Log based on request status
        if (status >= 200 && status < 300) {
          // Success:
          logger.success(`${status}: ${url}`);
          foundAssets.add({ url, status });
        } else if (status >= 300 && status < 400) {
          // Warnings:
          logger.warning(`${status}: ${url}`);
          foundAssets.add({ url, status });
        } else {
          // Errors:
          logger.error(`${status}: ${url}`);
          failedAssets.add({ url, error: `Status: ${status}. Unknown error` });
        }
      }
    },
    error: () => logger.error('Page crashed')
  };
};

export const printAssetRegexStats = (stats/*: Map<RegExp, number> */, logger/*: any */) => {
  stats.forEach((calls, regex) => {
    if (!calls) {
      logger.error(`${regex.toString()} didn't match any assets`);
    }
  });
}

export const isValidUrl = (url/*: string */) => {
  try {
    new URL(url);
    return true;
  } catch (e) {
    return false;
  }
}

export const cleanUrl = (url/*: string */) => {
  if (!/^https?:\/\//i.test(url)) {
    url = 'https://' + url;
  }
  return url;
}
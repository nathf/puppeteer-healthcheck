//@flow
const colors = require('ansi-colors');

import log from './log';

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
  assetRegexStats /*: Map<RegExp, number>*/,
  loggerFn/*: ?() => void */
) => {
  const logger = log(loggerFn);

  // If regex is not an array, convert it to one.
  if (!Array.isArray(regex)) {
    regex = [regex];
  }

  const regexSet = new Set(regex.map(r => {
    const regexp = new RegExp(r, 'g');
    assetRegexStats.set(regexp, 0)
    return regexp;
  }));

  if (regex.length !== 0) {
    logger.info(`Asset regex`);
    regexSet.forEach(v => logger.info(` - ${v.toString()}`));
  }

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
      const response = request.response();
      const status = (response && response.status()) || 'Unknown';

      if (url === requestedUrl && status < 300) {
        logger.success(`Requested URL loaded OK`);
      } else if (url === requestedUrl && status >= 400) {
        logger.error(`${status}: ${url}`);
        failedAssets.add({ url, status });
        return false;
      }

      if (match(url, regexSet, assetRegexStats)) {
        const response = request.response();
        const status = (response && response.status()) || 'Unknown';

        logger.success(`${status}: ${url}`);

        foundAssets.add({ url, status });
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

export const isFailedAsset = (url, failedAssets) => {
  let result = false;
  failedAssets.forEach(asset => {
    if (asset.url === url) {
      result = true;
    }
  });
  return result;
}


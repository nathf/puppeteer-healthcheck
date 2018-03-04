//@flow
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

export default (
  regex /*: ?string */,
  requestedUrl /*: string */,
  foundAssets /*: Set<FoundAsset> */,
  failedAssets /*: Set<FailedAsset> */,
  loggerFn/*: ?() => void */
) => {
  const logger = log(loggerFn);

  return {
    requestfailed: (request /*: any */) => {
      const url = request.url();

      if (request.url().match(regex)) {
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

      if (request.url().match(regex)) {
        const response = request.response();
        const status = (response && response.status()) || 'Unknown';

        logger.success(`${status}: ${url}`);

        foundAssets.add({ url, status });
      }
    },
    error: () => logger.error('Page crashed')
  };
};

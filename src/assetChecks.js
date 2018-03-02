//@flow
import log from './log';

/*::
type FoundAsset = {
  url: string,
  status: string
}

type FailedAsset = {
  url: string,
  error: string
}
*/

export default (
  regex /*: ?string */,
  requestedUrl /*: string */,
  foundAssets /*: Set<FoundAsset> */,
  failedAssets /*: Set<FailedAsset> */
) => {
  return {
    requestfailed: (request /*: any */) => {
      const url = request.url();

      if (request.url().match(regex)) {
        const failure = request.failure();
        const error = (failure && failure.errorText) || 'Unknown';
        const response = request.response();
        const status = (response && response.status()) || 'Unknown';

        log.error(`${status}: ${url}`);
        log.error(`Reason: ${error}`);

        failedAssets.add({ url, error });
      }
    },
    requestfinished: (request /*: any */) => {
      const url = request.url();
      if (url === requestedUrl) {
        log.success(`Document loaded OK`);
      }

      if (request.url().match(regex)) {
        const response = request.response();
        const status = (response && response.status()) || 'Unknown';

        log.success(`${status}: ${url}`);

        foundAssets.add({ url, status });
      }
    },
    error: () => log.error('Page crashed')
  };
};

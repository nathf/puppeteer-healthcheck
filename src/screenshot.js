//@flow

import logger from './log';

/*::
type Clip = {
  x: number,
  y: number,
  width: number,
  height: number
}

export type ScreenshotOpts = {
  path: string,
  type?: string,
  quality?: number,
  fullPage?: boolean,
  clip?: Clip,
  omitBackground?: boolean,
  viewport?: {
    width: number,
    height: number
  }
}
*/

const processScreenshots = async (page/*: any */, screenshotOpts/*: ScreenshotOpts[] */, loggerFn/*: ?() => void */)/*: Promise<*> */ => {
  const screenshotSet = new Set(screenshotOpts);

  // $FlowFixMe
  const iterator = screenshotSet[Symbol.iterator]();

  let current = iterator.next();
  while(!current.done) {
    const opt = current.value;

    if (opt.viewport) {
      logger.info(`Setting viewport ${JSON.stringify(opt.viewport)}`)
      await page.setViewport(opt.viewport);
    }

    try {
      await page.screenshot(opt);
      logger.success(opt.path);
    } catch(e) {
      logger.error(`Error saving: ${opt.path}`);
      logger.error(e);
    }

    current = iterator.next();
  }

  return Promise.resolve();
};

export default processScreenshots;
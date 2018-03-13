//@flow

import logger from './log';

/*::
import type { Options } from './main';

type AuthenticationType = 'http' | 'page';

type HTTPCredentials = {
  username: string,
  password: string
}

type PageCredentials = {
  [username_selector: string]: string,
  password_selector: string
}

export type Authentication = {
  type: AuthenticationType,
  uri: ?string,
  credentials: HTTPCredentials | PageCredentials
}
*/

const authentication = (page/*: any */, opts/*: Options */)/*: Promise<any> */ => {
  switch(opts.authentication && opts.authentication.type) {
    case 'http':
      logger.info('Using HTTP Authentication');
      return httpAuthentication(page, opts.authentication, opts.uri);
    case 'page':
      logger.info('Using Page Authentication');
      return pageAuthentication(page, opts.authentication, opts.uri);
    default:
      return Promise.resolve();
  }
}

const httpAuthentication = async (page, authentication, uri) => {
  return await page.authenticate(authentication.credentials);
}

const pageAuthentication = (page, authentication, uri) => {
  return Promise.reject('pageAuthentication is not yet implemented');
}

export default authentication;
import healthcheck from '../../src/main';
import { getConfig } from '../support/fixture.helpers';

test('Integration - Requesting an invalid URI', async () => {
  const spy = jest.spyOn(console, 'log');

  try {
    await healthcheck.run(getConfig('invalid-uri'));
  } catch(e) {}

  expect(spy).toRoughlyMatchArray([
    'ℹ️   Requesting https://someinvaliduri',
    '❌   Failed to load the page: net::ERR_NAME_NOT_RESOLVED'
   ]);

  spy.mockReset();
  spy.mockRestore();
})
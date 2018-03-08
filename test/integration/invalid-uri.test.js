import healthcheck from '../../src/main';
import { getFixtureDetails, getSpyResults } from '../support/fixtureHelpers';

test('Integration - Requesting an invalid URI', async () => {
  const spy = jest.spyOn(console, 'log');
  
  const { config } = getFixtureDetails('invalid-uri');

  try {
    await healthcheck.run(config);
  } catch(e) {}

  expect(getSpyResults(spy)).toRoughlyMatchArray([
    'ℹ️   Requesting https://someinvaliduri',
    '❌   Failed to load the page: net::ERR_NAME_NOT_RESOLVED'
   ]);

  spy.mockReset();
  spy.mockRestore();
})
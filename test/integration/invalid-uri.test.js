import healthcheck from '../../src/main';
import { getFixtureDetails, getSpyResults } from '../support/fixtureHelpers';

test('Integration - Requesting an invalid URI', async () => {
  const spy = jest.spyOn(console, 'log');
  
  const { config } = getFixtureDetails('invalid-uri');

  try {
    await healthcheck.run(config);
  } catch(e) {}

  expect(getSpyResults(spy)).toRoughlyMatchArray([
    'ℹ️   Requesting someinvaliduri',
    '❌   Failed to load the page: Protocol error (Page.navigate): Cannot navigate to invalid URL undefined'
   ]);

  spy.mockReset();
  spy.mockRestore();
})
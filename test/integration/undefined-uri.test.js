import healthcheck from '../../src/main';
import { getFixtureDetails, getSpyResults } from '../support/fixtureHelpers';

test('Integration - Requesting an invalid URI', async () => {
  const spy = jest.spyOn(console, 'log');

  const { config } = getFixtureDetails('undefined-uri');

  try {
    await healthcheck.run(config);
  } catch(e) {}

  expect(getSpyResults(spy)).toRoughlyMatchArray([
    '❌   Invalid URI. Please check your configuration.'
   ]);

  spy.mockReset();
  spy.mockRestore();
})
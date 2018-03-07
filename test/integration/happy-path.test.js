import healthcheck from '../../src/main';
import { getFixtureDetails, getSpyResults, port } from '../support/fixtureHelpers';

test('Integration - Happy path, everything 200', async () => {
  const spy = jest.spyOn(console, 'log');
  
  const { config, route } = getFixtureDetails('happy-path');
  const opts = Object.assign({}, config, {
    uri: route
  });

  try {
    await healthcheck.run(opts);
  } catch(e) {}

  expect(getSpyResults(spy)).toRoughlyMatchArray([
    `ℹ️   Requesting http://localhost:${port}/fixtures/happy-path`,
    'ℹ️   Asset regex',
    'ℹ️    - /(main.js|style.css)$/g',
    '✅   Document loaded OK',
    `✅   200: http://localhost:${port}/fixtures/happy-path/assets/style.css`,
    `✅   200: http://localhost:${port}/fixtures/happy-path/assets/main.js`,
    '✅   Page loaded OK',
    'ℹ️   Closing browser...',
    '✅   Everything OK!'
   ]);

  spy.mockReset();
  spy.mockRestore();
})
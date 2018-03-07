import healthcheck from '../../src/main';
import { getFixtureDetails, getSpyResults, port } from '../support/fixtureHelpers';

test('Integration - Mixed asset results', async () => {
  const spy = jest.spyOn(console, 'log');
  
  const { config, route } = getFixtureDetails('mixed');
  const opts = Object.assign({}, config, {
    uri: route
  });

  try {
    await healthcheck.run(opts);
  } catch(e) {}

  expect(getSpyResults(spy)).toRoughlyMatchArray([
    `ℹ️   Requesting http://localhost:${port}/fixtures/mixed`,
    'ℹ️   Asset regex',
    'ℹ️    - /main.js$/g',
    'ℹ️    - /style.css$/g',
    'ℹ️    - /nonexistant.css$/g',
    '✅   Document loaded OK',
    `✅   200: http://localhost:${port}/fixtures/mixed/assets/style.css`,
    `❌   404: http://localhost:${port}/fixtures/mixed/assets/main.js`,
    '❌   Reason: net::ERR_ABORTED',
    '✅   Page loaded OK',
    '❌   /nonexistant.css$/g didn\'t match any assets',
    'ℹ️   Closing browser...',
    '❌   Some assets failed to load...',
    `❌   	- http://localhost:${port}/fixtures/mixed/assets/main.js`
   ]);

  spy.mockReset();
  spy.mockRestore();
})
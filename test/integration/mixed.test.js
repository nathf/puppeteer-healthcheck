import healthcheck from '../../src/main';
import { getFixtureConfig } from '../support/fixture.helpers';

test('Integration - Mixed asset results', async () => {
  const spy = jest.spyOn(console, 'log');

  try {
    await healthcheck.run(getFixtureConfig('mixed'));
  } catch(e) {}

  expect(spy).toRoughlyMatchArray([
    'ℹ️   Requesting http://localhost:PORT/fixtures/mixed',
    'ℹ️   Asset regex',
    'ℹ️    - /main.js$/g',
    'ℹ️    - /style.css$/g',
    'ℹ️    - /nonexistant.css$/g',
    '✅   Document loaded OK',
    '✅   200: http://localhost:PORT/fixtures/mixed/assets/style.css',
    '❌   404: http://localhost:PORT/fixtures/mixed/assets/main.js',
    '❌   Reason: net::ERR_ABORTED',
    '✅   Page loaded OK',
    '❌   /nonexistant.css$/g didn\'t match any assets',
    'ℹ️   Closing browser...',
    '❌   Some assets failed to load...',
    '❌   	- http://localhost:PORT/fixtures/mixed/assets/main.js'
   ]);

  spy.mockReset();
  spy.mockRestore();
})
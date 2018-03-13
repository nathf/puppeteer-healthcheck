import healthcheck from '../../src/main';
import {
  getFixtureDetails,
  getSpyResults,
  port,
  getConfig
} from '../support/fixtureHelpers';

test('Integration - HTTP Authorization: Basic', async () => {
  const spy = jest.spyOn(console, 'log');

  const { config, route } = getFixtureDetails('http-auth');
  const opts = Object.assign({}, config, {
    uri: route
  });

  try {
    await healthcheck.run(opts);
  } catch (e) {}

  expect(getSpyResults(spy)).toRoughlyMatchArray([
    `ℹ️   Requesting http://localhost:${port}/fixtures/http-auth`,
    'ℹ️   Asset regex',
    'ℹ️    - /style.css$/g',
    'ℹ️   Using HTTP Authentication',
    '✅   Document loaded OK',
    `✅   200: http://localhost:${port}/fixtures/http-auth/assets/style.css`,
    '✅   Page loaded OK',
    'ℹ️   Closing browser...',
    '✅   Everything OK!'
  ]);

  spy.mockReset();
  spy.mockRestore();
});

test('Integration - HTTP Authorization: Basic. Invalid Credentials', async () => {
  const spy = jest.spyOn(console, 'log');

  const { route } = getFixtureDetails('http-auth');
  const opts = Object.assign({}, getConfig('http-auth', 'config.badcreds'), {
    uri: route
  });

  try {
    await healthcheck.run(opts);
  } catch (e) {}

  expect(getSpyResults(spy)).toRoughlyMatchArray([
    `ℹ️   Requesting http://localhost:${port}/fixtures/http-auth`,
    'ℹ️   Asset regex',
    'ℹ️    - /style.css$/g',
    'ℹ️   Using HTTP Authentication',
    '✅   Document loaded OK',
    '✅   Page loaded OK',
    "❌   /style.css$/g didn't match any assets",
    'ℹ️   Closing browser...',
    '✅   Everything OK!'
  ]);

  spy.mockReset();
  spy.mockRestore();
});

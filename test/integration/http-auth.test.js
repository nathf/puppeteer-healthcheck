import healthcheck from '../../src/main';
import {
  getFixtureConfig,
  getConfig
} from '../support/fixture.helpers';

test('Integration - HTTP Authorization: Basic', async () => {
  const spy = jest.spyOn(console, 'log');

  try {
    await healthcheck.run(getFixtureConfig('http-auth'));
  } catch (e) {}

  expect(spy).toRoughlyMatchArray([
    'ℹ️   Requesting http://localhost:PORT/fixtures/http-auth',
    'ℹ️   Asset regex',
    'ℹ️    - /style.css$/g',
    'ℹ️   Using HTTP Authentication',
    '✅   Document loaded OK',
    '✅   200: http://localhost:PORT/fixtures/http-auth/assets/style.css',
    '✅   Page loaded OK',
    'ℹ️   Closing browser...',
    '✅   Everything OK!'
  ]);

  spy.mockReset();
  spy.mockRestore();
});

test('Integration - HTTP Authorization: Basic. Invalid Credentials', async () => {
  const spy = jest.spyOn(console, 'log');

  const opts = {
    ...getFixtureConfig('http-auth'),
    ...getConfig('http-auth', 'config.badcreds')
  };

  try {
    await healthcheck.run(opts);
  } catch (e) {}

  expect(spy).toRoughlyMatchArray([
    'ℹ️   Requesting http://localhost:PORT/fixtures/http-auth',
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

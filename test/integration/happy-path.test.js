import healthcheck from '../../src/main';
import { getFixtureConfig } from '../support/fixture.helpers';

test('Integration - Happy path, everything 200', async () => {
  const spy = jest.spyOn(console, 'log');

  try {
    await healthcheck.run(getFixtureConfig('happy-path'));
  } catch(e) {}

  expect(spy).toRoughlyMatchArray([
    'ℹ️   Requesting http://localhost:PORT/fixtures/happy-path',
    'ℹ️   Asset regex',
    'ℹ️    - /(main.js|style.css)$/g',
    '✅   Document loaded OK',
    '✅   200: http://localhost:PORT/fixtures/happy-path/assets/style.css',
    '✅   200: http://localhost:PORT/fixtures/happy-path/assets/main.js',
    '✅   Page loaded OK',
    'ℹ️   Closing browser...',
    '✅   Everything OK!'
   ]);

  spy.mockReset();
  spy.mockRestore();
})
import healthcheck from '../../src/main';
import { getFixtureDetails, getSpyResults, port } from '../support/fixtureHelpers';

test('Integration - Can grab screenshots of requested page', async () => {
  const spy = jest.spyOn(console, 'log');
  
  const { config, route, dir } = getFixtureDetails('screenshot');

  const opts = Object.assign({}, config, {
    uri: route
  });

  try {
    await healthcheck.run(opts);
  } catch(e) {}

  const basepath = process.env.ARTIFACT_PATH || dir;

  expect(getSpyResults(spy)).toRoughlyMatchArray([
    `ℹ️   Requesting http://localhost:${port}/fixtures/screenshot`,
    'ℹ️   Asset regex',
    'ℹ️    - /hash-(.+).js/g',
    'ℹ️    - /hash-(.+).css/g',
    '✅   Document loaded OK',
    `✅   200: http://localhost:${port}/fixtures/screenshot/assets/hash-f78ghaw7.css`,
    `✅   200: http://localhost:${port}/fixtures/screenshot/assets/hash-h7sadwaj.js`,
    '✅   Page loaded OK',
    'ℹ️   Setting viewport {"width":800,"height":300}',
    `✅   ${basepath}/desktop.png`,
    `✅   ${basepath}/fullpage.png`,
    'ℹ️   Setting viewport {"width":375,"height":667}',
    `✅   ${basepath}/narrow.png`,
    'ℹ️   Closing browser...',
    '✅   Everything OK!'
   ]);

  spy.mockReset();
  spy.mockRestore();
})
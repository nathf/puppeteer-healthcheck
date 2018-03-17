import healthcheck from '../../src/main';
import { getFixtureConfig, getFixtureDetails } from '../support/fixture.helpers';

test('Integration - Can grab screenshots of requested page', async () => {
  const spy = jest.spyOn(console, 'log');
  
  const { dir } = getFixtureDetails('screenshot');

  try {
    await healthcheck.run(getFixtureConfig('screenshot'));
  } catch(e) {}

  const basepath = process.env.ARTIFACT_PATH || dir;

  expect(spy).toRoughlyMatchArray([
    'ℹ️   Requesting http://localhost:PORT/fixtures/screenshot',
    'ℹ️   Asset regex',
    'ℹ️    - /hash-(.+).js/g',
    'ℹ️    - /hash-(.+).css/g',
    '✅   Document loaded OK',
    '✅   200: http://localhost:PORT/fixtures/screenshot/assets/hash-f78ghaw7.css',
    '✅   200: http://localhost:PORT/fixtures/screenshot/assets/hash-h7sadwaj.js',
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
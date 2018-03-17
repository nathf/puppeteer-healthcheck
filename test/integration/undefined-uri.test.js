import healthcheck from '../../src/main';
import { getConfig } from '../support/fixture.helpers';

test('Integration - Requesting an invalid URI', async () => {
  const spy = jest.spyOn(console, 'log');

  try {
    await healthcheck.run(getConfig('undefined-uri'));
  } catch(e) {}

  expect(spy).toRoughlyMatchArray([
    '❌   Invalid URI. Please check your configuration.'
   ]);

  spy.mockReset();
  spy.mockRestore();
})
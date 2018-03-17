import { cleanUrl, isValidUrl } from '../../src/assetChecks';

test('isValidUrl should return true if valid URL', () => {
  expect(isValidUrl('google.com')).toBe(false);
  expect(isValidUrl('http://google.com')).toBe(true);
  expect(isValidUrl('https://google.com')).toBe(true);
});

test('cleanUrl should return a URL string with a default protocol of HTTPS', () => {
  expect(cleanUrl('google.com')).toBe('https://google.com');
  expect(cleanUrl('http://google.com')).toBe('http://google.com');
  expect(cleanUrl('https://google.com')).toBe('https://google.com');
});
const diff = require('jest-diff');
const ansi_up = require('ansi_up');
const ansi = new ansi_up.default();

const extractAndNormaliseSpy = spy => {
  return spy.mock.calls.reduce((acc, current) => {
    const log = ansi.ansi_to_text(current.join(' '));
    return acc.concat(log);
  }, []);
};

const normaliseItem = str =>
  str.replace(/localhost\:(\d)*\//, 'localhost:PORT/');

expect.extend({
  toRoughlyMatchArray(input, expected) {
    let received = input;
    // If a spy object is passed in, extract and normalise.
    if (input.mock) {
      received = extractAndNormaliseSpy(input);
    }

    // Order of logs could be different depending on how puppeteer
    // processes requests. Order of logs isn't super important.
    // So we match expected logs exist in output and match length.
    const expectedContainsReceived = received
      .map(normaliseItem)
      .filter(o => expected.includes(o));
    const pass =
      received.length === expected.length &&
      expectedContainsReceived.length === expected.length;

    const message = pass
      ? () =>
          this.utils.matcherHint('.not.toRoughlyMatchArray') +
          '\n\n' +
          `Expected value to not be:\n` +
          `  ${this.utils.printExpected(expected)}\n` +
          `Received:\n` +
          `  ${this.utils.printReceived(received)}`
      : () => {
          const diffString = diff(expected, received, {
            expand: this.expand
          });

          return (
            this.utils.matcherHint('.toRoughlyMatchArray') +
            '\n\n' +
            `Expected value to be:\n` +
            `  ${this.utils.printExpected(expected)}\n` +
            `Received:\n` +
            `  ${this.utils.printReceived(received)}` +
            (diffString ? `\n\nDifference:\n\n${diffString}` : '')
          );
        };

    return { actual: received, message, pass };
  }
});

const diff = require('jest-diff');

expect.extend({
  toRoughlyMatchArray(received, expected) {
    // Order of logs could be different depending on how puppeteer
    // processes requests. Order of logs isn't super important.
    // So we match expected logs exist in output and match length.
    const expectedContainsReceived = received.filter(o => expected.includes(o));
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

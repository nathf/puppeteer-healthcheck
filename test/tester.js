//@flow

const path = require('path');
const fs = require('fs');
const util = require('util');

const glob = require('glob');
const colors = require('ansi-colors');
const ansi_up = require('ansi_up');

const phNode = require('../lib/puppeteer-healthcheck');

const port = process.env.PORT || '5555';
const getRouteForFixture = (path) => `http://localhost:${port}/${path}`;
const readFile = util.promisify(fs.readFile);
const ansi = new ansi_up.default();

process.on('unhandledRejection', err => {
  throw err;
});

function printResults(result, expected, output, fixture) {
  if (result) {
    console.log('✅ ', colors.green(fixture));
  } else {
    console.log('❌ ', colors.red(fixture));
    console.log(`
Expected:

${expected.join('\n')}

to equal

${output.join('\n')}
`);
  }
  console.log();
}

async function run() {
  const manifests = glob.sync('**/config.js', { cwd: __dirname });

  console.log();

  const runner = manifests.map(async (manifest) => {
    // $FlowFixMe
    const config = require(`./${manifest}`);
    const fixture = path.dirname(manifest);

    const output = [];
    const opts = Object.assign({}, config, {
      uri: getRouteForFixture(fixture),
      logger: (...args) => {
        const text = ansi.ansi_to_text(args.join(' '));
        output.push(text);
      }
    });
   
    try {
      await phNode.run(opts);
    } catch(e) {
      // This will yield run results
      //console.log(e);
    }
    
    // $FlowFixMe
    let expected = require(`./${fixture}/expected`);
    if (expected && typeof expected === 'function') {
      expected = expected();
    }

    // Order of logs could be different depending on how puppeteer
    // processes requests. Order of logs isn't super important.
    // So we match expected logs exist in output and match length.
    const logExists = output.filter(o => expected.includes(o));
    const result = logExists.length === expected.length;

    printResults(result, expected, output, fixture);

    return [
      fixture,
      result
    ]
  });

  const results = await Promise.all(runner);
  
  const failures = results.filter(([fixture, result]) => result === false);
  if (failures.length) {
    throw new Error(colors.bold(colors.red(`${failures.length} test(s) failed`)));
  }

  console.log(colors.bold(colors.green('All tests passed')));
}

const server = require('./support/server');
const s = server.listen(port);

(async () => {
  try {
    await run();
    s.close();
  } catch (e) {
    console.error(e);
    s.close();
    process.exit(1);
  }
})();


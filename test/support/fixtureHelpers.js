const path = require('path');
const ansi_up = require('ansi_up');
const ansi = new ansi_up.default();

const port = process.env.PORT || '5555';

const getRoute = fixture => {
  return `http://localhost:${port}/fixtures/${fixture}`;
}

const getConfig = fixture => {
  return require(`../fixtures/${fixture}/config`);
}

const getSpyResults = spy => {
  return spy.mock.calls.reduce((acc, current) => {
    const log = ansi.ansi_to_text(current.join(' '));
    return acc.concat(log);
  }, []);
}

const getFixtureDir = fixture => {
  return path.resolve(__dirname, `../fixtures/${fixture}`);
}

const getFixtureDetails = fixture => {
  return {
    config: getConfig(fixture),
    route: getRoute(fixture),
    dir: getFixtureDir(fixture)
  }
}

export {
  port,
  getFixtureDetails,
  getRoute,
  getConfig,
  getSpyResults,
  getFixtureDir
}
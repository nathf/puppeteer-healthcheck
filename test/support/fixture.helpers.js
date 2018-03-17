const path = require('path');
const ansi_up = require('ansi_up');
const ansi = new ansi_up.default();

const port = process.env.PORT || '5555';

const getRoute = fixture => {
  return `http://localhost:${port}/fixtures/${fixture}`;
}

const getConfig = (fixture, name = 'config') => {
  return require(`../fixtures/${fixture}/${name}`);
}

const getFixtureDir = fixture => {
  return path.resolve(__dirname, `../fixtures/${fixture}`);
}

const getFixtureConfig = fixture => {
  return {
    ...getConfig(fixture),
    uri: getRoute(fixture)
  }
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
  getFixtureConfig,
  getRoute,
  getConfig,
  getFixtureDir
}
const util = require('util');
const url = require('url');
const fs = require('fs');
const path = require('path');
const micro = require('micro');
const mime = require('mime');

const applyMiddleware = (path, req, res) => {
  try {
    const middleware = require(`${path}/middleware`);
    middleware(micro, req, res);
  } catch(e) {}
}

const server = micro(async (req, res) => {
  const parseUrl = url.parse(req.url);
  const assetPath = path.join(__dirname, '..', parseUrl.pathname);

  const fileExists = util.promisify(fs.exists);
  const readFile = util.promisify(fs.readFile);

  const exist = await fileExists(assetPath);
  if (!exist) {
    return micro.send(res, 404);
  }

  let file = assetPath;
  if (fs.statSync(assetPath).isDirectory()) {
    file = `${assetPath}/index.html`;

    // Each fixture may want to alter the server in some way
    // Apply each fixture middleware here.
    applyMiddleware(assetPath, req, res);
  }

  try {
    res.setHeader('Content-type', mime.getType(file))
    
    const data = await readFile(file);
    return micro.send(res, 200, data);
  } catch(e) {
    return micro.send(res, 500)
  }
});

module.exports = server;
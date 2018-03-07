const server = require('./server');

module.exports = async (...args) => {
  server.listen(process.env.PORT || '5555');
}
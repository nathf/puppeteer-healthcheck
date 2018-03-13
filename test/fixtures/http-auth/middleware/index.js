module.exports = (micro, req, res) => {
  const authorization = req.headers.authorization;
  if (!authorization) {
    res.setHeader('WWW-Authenticate', 'Basic realm="Pls"');
    return micro.send(res, 401);
  }

  const CREDENTIALS_REGEXP = /^ *(?:[Bb][Aa][Ss][Ii][Cc]) +([A-Za-z0-9._~+/-]+=*) *$/
  const USER_PASS_REGEXP = /^([^:]*):(.*)$/

  const [,base64string] = CREDENTIALS_REGEXP.exec(authorization);
  if (!base64string) {
    return undefined
  }

  const hashed = Buffer.from(base64string, 'base64').toString()
  const [,user, password] = USER_PASS_REGEXP.exec(hashed)

  if (user !== 'foo' || password !== 'bar') {
    return micro.send(res, 401);
  } 
}
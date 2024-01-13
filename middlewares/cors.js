const allowedCors = [
  'https://localhost:3000',
  'http://localhost:3000',
  'https://localhost:3001',
  'http://localhost:3001',
  "https://polivaijkin.shop",
  "http://polivaijkin.shop",
  "https://xn--80adrcegcwbj.xn--p1ai",
  "http://xn--80adrcegcwbj.xn--p1ai"
];
module.exports = (req, res, next) => {
  const { origin } = req.headers;
  const { method } = req;
  // const requestHeaders = req.headers['access-control-request-headers'];
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
  res.header('Access-Control-Allow-Credentials', true);

  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }
  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    return res.end();
  }

  return next();
};
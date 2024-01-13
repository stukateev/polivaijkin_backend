const allowedCors = [
  'https://localhost:3000',
  'http://localhost:3000',
  'https://localhost:5000',
  'http://localhost:5000',
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
  const requestHeaders = req.headers['access-control-request-headers'];
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
  if (allowedCors.includes(origin)) {
    res.set({
      'Access-Control-Allow-Origin': origin,
      'Access-Control-Allow-Credentials': true,
    });
  }
  if (method === 'OPTIONS') {
    res.set({
      'Access-Control-Allow-Methods': DEFAULT_ALLOWED_METHODS,
      'Access-Control-Allow-Headers': requestHeaders,
    });
    res.end();
    return;
  }

  next();
};



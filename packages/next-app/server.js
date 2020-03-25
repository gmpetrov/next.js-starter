const express = require('express');
var cookieParser = require('cookie-parser');
const { parse } = require('url');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();
  server.use(cookieParser());

  server.get('*', (req, res) => {
    const parsedUrl = parse(req.url, true);
    const { pathname, query } = parsedUrl;
    handle(req, res, parsedUrl);
  });

  server.listen(3000);
});

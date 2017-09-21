'use strict';

const requestParser = require('./request-parser.js');

let routeHandlers = {
  POST: {},
  GET: {},
  PUT: {},
  PATCH: {},
  DELETE: {},
  HEAD: {},
  OPTIONS: {},
  CONNECT: {}
}

module.exports = {
  post: (url, callback) => {
    routeHandlers.POST[url] = callback
  },
  get: (url, callback) => {
    routeHandlers.GET[url] = callback
  },
  put: (url, callback) => {
    routeHandlers.PUT[url] = callback
  },
  delete: (url, callback) => {
    routeHandlers.DELETE[url] = callback
  },
  route: (req, res) => {
    console.log(routeHandlers);
    requestParser(req)
    .then(req => {
      let handler = routeHandlers[req.method][req.url.pathname];
      console.log('handler', req.url.pathname);
      if (handler)
        return handler(req, res);
      res.writeHead(404);
      res.end();
    })
    .catch(err => {
      console.error('::REQUEST_ERROR::', err);
      res.writeHead(400);
      res.end();
    })
  },
}

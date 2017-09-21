'use strict';

const requestParser = require('./request-parser.js');

let routeHandlers = {
  POST: {},
  GET: {},
  PUT: {},
  DELETE: {},
  PATCH: {},
  OPTIONS: {},
  CONNECT: {},
  HEAD: {},
};

module.exports = {
  get: (url, callback) => {
    routeHandlers.GET[url] = callback
  }

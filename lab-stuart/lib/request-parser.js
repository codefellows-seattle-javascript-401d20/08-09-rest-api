'use-strict';

const url = require('url');
const queryString = require('querystring');

module.exports = (req) => {
  return new Promise ((resolve, reject) => {
    req.url = url.parse(req.url);
    req.url.query = queryString.parse(req.url.query);

    if (!(req.method === 'POST' || req.method === 'PUT'))
      return resolve(req)

    let text = '';
    req.on('data', (buffer) => {
      text += buffer.toString();
    });

    req.on('end', () => {
      try {
        req.text = text;
        if (req.headers['content-type'].indexOf('application/json') > -1)
          req.body = JSON.parse(text);
        resolve(req);
      } catch(err) {
        reject(err);
      }
    });

    req.on('error', reject);
  });
}
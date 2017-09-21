'use-strict';

const Sandwich = require('../model/sandwich.js');
const router = require('../lib/router.js');

let sandwiches = [];

let sendStatus = (res, status, message) => {
  console.error('::REQUESTS_ERROR::', message);
  res.writeHead(status);
  res.end();
}

let sendJSON = (res, status, data) => {
  res.writeHead(status, {
    'Content-Type': 'application/json',
  })
  res.end(JSON.stringify(data));
}

router.post('/api/sandwiches', (req, res) => {
  if(!req.body)
    return sendStatus(res, 400, 'no body found');
  if(!req.body.title)
    return sendStatus(res, 400, 'no title found');
  if(!req.body.content)
    return sendStatus(res, 400, 'no content found');

  let sandwich = new Sandwich(req.body);
  sandwiches.push(sandwich);
  sendJSON(res, 200, sandwich);
})

router.get('/api/sandwiches', (req, res) => {
  console.log('test')
})

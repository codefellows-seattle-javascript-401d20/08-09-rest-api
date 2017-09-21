'use-strict';

const Sandwich = require('../model/sandwich.js');
const router = require('../lib/router.js');

let sandwiches = [];

let sendStatus = (res, status, message) => {
  if (status === 400)
    console.error('::REQUESTS_ERROR::', message);
  if (status === 200)
    console.log('::SANDWICHES_ARE_DELICIOUS::', message);
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
  if(!req.body.bread)
    return sendStatus(res, 400, 'no title bread');
  if(!req.body.cheese)
    return sendStatus(res, 400, 'no content cheese');
    if(!req.body.spread)
    return sendStatus(res, 400, 'no content spread');

  let sandwich = new Sandwich(req.body);
  sandwiches.push(sandwich);
  sendJSON(res, 200, sandwich);
});

router.get('/api/sandwiches', (req, res) => {
  if (!sandwiches.length)
    return sendStatus(res, 400, 'sandwiches not set');
  if (req.url.query.id) {
    let sandwichId = req.url.query.id;
    let sandwichFilter = sandwiches.filter(sandwich => sandwich.id === sandwichId);
    if (sandwichFilter.length > 0)
      return sendStatus(res, 200, sandwichFilter[0]);
    return sendStatus(res, 404, 'sandwich not found');      
  }
  return sendStatus(res, 200, sandwiches);
});

router.delete('/api/sandwiches', (req, res) => {
  if (req.url.query.id) {
    let sandwichId = req.url.query.id;
    let sandwichFilter = sandwiches.filter(sandwich => sandwich.id === sandwichId);
    if (sandwichFilter.length > 0) {
      sandwiches = sandwiches.filter(sandwich => sandwich.id !== sandwichId);
      return sendStatus(res, 204, sandwiches);
    } else {
      return sendStatus(res, 404, 'sandwich not found');
    }  
  }
  return sendStatus(res, 400, 'sandwich id is required');
});

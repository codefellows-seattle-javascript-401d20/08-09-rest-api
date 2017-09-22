'use-strict';

const Sandwich = require('../model/sandwich.js');
const router = require('../lib/router.js');
const storage = require('../lib/storage.js')

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
    return sendStatus(res, 400, 'no content bread');
  if(!req.body.cheese)
    return sendStatus(res, 400, 'no content cheese');
    if(!req.body.spread)
    return sendStatus(res, 400, 'no content spread');

  let sandwich = new Sandwich(req.body);

  storage.setItem(sandwich)
  .then(sandwich => {
    return sendJSON(res, 200, sandwich)
  })
  .catch(err => {
    console.error(err)
    return sendStatus(res, 500)
  })
});

// router.get('/api/sandwiches', (req, res) => {
//   if (!sandwiches.length)
//     return sendStatus(res, 400, 'sandwiches not set');
//   if (req.url.query.id) {
//     let sandwichId = req.url.query.id;
//     let sandwichFilter = sandwiches.filter(sandwich => sandwich.id === sandwichId);
//     if (sandwichFilter.length > 0)
//       return sendStatus(res, 200, sandwichFilter[0]);
//     return sendStatus(res, 404, 'sandwich not found');      
//   }
//   return sendStatus(res, 200, sandwiches);
// });

router.get('/api/sandwiches', (req, res) => {
  if(req.url.query.id){
    storage.fetchItem(req.url.query.id)
    .then(sandwich => sendJSON(res, 200, sandwich))
    .catch(err => {
      console.error(err);
      if(err.message.indexOf('not found') > -1)
        return sendStatus(res, 404);
      sendStatus(500);
    })
  } else {
    storage.fetch()
    .then(sandwiches => sendJSON(res, 200, sandwiches))
    .catch(err => {
      console.error(err);
      sendStatus(res, 500);
    })
  }
});

router.delete('/api/sandwiches', (req, res) => {
  if(req.url.query.id){
    storage.deleteItem(req.url.query.id)
    .then(sendStatus(res, 204))
    .catch(err => {
      console.error(err);
      if(err.message.indexOf('not found') > -1)
        return sendStatus(res, 404, 'sandwich not found');
      sendStatus(500);
    })
  } else {
    return sendStatus(res, 400, 'sandwich id is required');
  }
});

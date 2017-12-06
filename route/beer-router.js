'use strict';

const Beer = require('../model/beer.js');
const router = require('../lib/router.js');
const storage = require('../lib/storage.js');

// store data while the server is running
let beers = [];

let sendStatus = (res, status) => {
  res.writeHead(status);
  res.end();
};

let sendJSON = (res, status, data) => {
  res.writeHead(status, {
    'Content-Type': 'application/json',
  });
  res.end(JSON.stringify(data));
};

router.post('/api/beers', (req, res) => {
  if(!req.body)
    return sendStatus(res, 400, 'no body found');
  if(!req.body.title)
    return sendStatus(res, 400, 'no title found');
  if(!req.body.type)
    return sendStatus(res, 400, 'no type found');
  if(!req.body.abv)
    return sendStatus(res, 400, 'no abv found');

  let beer = new Beer(req.body);

  // persist the beer
  storage.setItem(beer)
  .then(beer => {
    return sendJSON(res, 200, beer);
  })
  .catch(err => {
    console.error(err);
    return sendStatus(res, 500);
  });
});

router.get('/api/beers', (req, res) => {
  if(req.url.query.id){
    // send one beer
    storage.fetchItem(req.url.query.id)
    .then(beer => sendJSON(res, 200, beer))
    .catch(err => {
      console.error(err);
      if(err.message.indexOf('not found') > -1)
        return sendStatus(res, 404);
      sendStatus(500);
    });
  } else {
    // send all the beers
    storage.fetch()
    .then(beers => sendJSON(res, 200, beers))
    .catch(err => {
      console.error(err);
      sendStatus(res, 500);
    });
  }
});

router.delete('/api/beers', (req, res) => {
  if(!req.url.query.id){
    return sendStatus(res, 400);
  } else {
    storage.fetchItem(req.url.query.id)
    .then(beer => {
      return storage.deleteItem(beer.id);
    })
    .then(() => {
      sendStatus(res, 204);
    })
    .catch(err => {
      if(err.message.indexOf('not found') > -1)
        return sendStatus(res, 404);
      sendStatus(res, 500);
    });
  }
});

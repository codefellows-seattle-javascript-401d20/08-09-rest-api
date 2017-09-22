'use strict';

const Book = require('../model/book.js');
const router = require('../lib/router.js');
const storage = require('../lib/storage.js');

// store data while the server runs
let books = [];

let sendStatus = (res, status, message) => {
  console.error('__REQUESTS_ERROR__', message);
  res.writeHead(status);
  res.end();
};

let sendJSON = (res, status, data) => {
  res.writeHead(status, {
    'Content-Type': 'application/json',
  });
  res.end(JSON.stringify(data));
};

router.post('/api/books', (req, res) => {
  if(!req.body)
    return sendStatus(res, 400, 'no body found');
  if(!req.body.title)
    return sendStatus(res, 400, 'no title found');
  if(!req.body.author)
    return sendStatus(res, 400, 'no author found');
  if(!req.body.description)
    return sendStatus(res, 400, 'no description found');

  let book = new Book(req.body);

  // persist the book
  storage.setItem(book)
    .then(book => {
      return sendJSON(res, 200, book);
    })
    .catch(err => {
      console.error(err);
      return sendStatus(res, 500);
    });
});

router.get('/api/books', (req, res) => {
  if(req.url.query.id){
    // send a book
    storage.fetchItem(req.url.query.id)
      .then(book => sendJSON(res, 200, book))
      .catch(err => {
        console.error(err);
        if(err.message.indexOf('not found') > -1)
          return sendStatus(res, 404);
        sendStatus(500);
      });
  } else {
    // send all the books
    storage.fetch()
      .then(books => sendJSON(res, 200, books))
      .catch(err => {
        console.error(err);
        sendStatus(res, 500);
      });
  }
});

router.delete('/api/books', (req, res) => {
  if(req.url.query.id){
    storage.removeItem(req.url.query.id)
      .then(sendStatus(res, 204))
      .catch(err => {
        console.error(err);
        if(err.message.indexOf('not found') > -1)
          return sendStatus(res, 404);
        sendStatus(500);
      });
  }
  sendStatus(res, 400, 'no ID in query');
});

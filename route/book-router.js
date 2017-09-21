'use strict';

const Book = require('../model/book.js');
const router = require('../lib/router.js');

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
  if(!req.body.title)
    return sendStatus(res, 400, 'no title found');
  if(!req.body.author)
    return sendStatus(res, 400, 'no author found');
  if(!req.body.description)
    return sendStatus(res, 400, 'no description found');

  let book = new Book(req.body);
  books.push(book);
  sendJSON(res, 200, book);
});

router.get('/api/books', (req, res) => {
  if(req.url.query.id){
    let newBook = books.find(book => book.id === req.url.query.id);
    if(newBook){
      sendJSON(res, 200, newBook);
    }
    else {
      sendStatus(res, 404, 'no ID found');
    }
  }
  sendJSON(res, 200, books);
});

router.delete('/api/books', (req, res) => {
  if(req.url.query.id){
    let index = books.indexof(req.url.query.id);
    books.splice(index, index);
    if(!books.indexof(req.url.query.id)){
      return sendStatus(res, 204, 'no body found');
    }
  }
  if(!req.url.query.id){
    sendStatus(res, 400, 'no ID found');
  }
  return sendStatus(res, 404, 'no body found');
});

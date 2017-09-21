'use strict';

const Movie = require('../model/books.js');
const router = require('../lib/router.js');

// store data while the server is running
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
  if(!req.body.content)
    return sendStatus(res, 400, 'no content found');

  let movie = new Movie(req.body);
  books.push(movie);
  sendJSON(res, 200, movie);
});

router.get('/api/books', (req, res) => {
  if(req.url.query.id) {
    let booksSearched = books.find(movie => movie.id === req.url.query.id);
    return booksSearched ? sendJSON(res, 200, booksSearched)
    : sendStatus(res, 404, 'selection did not match the movie');
  }
  return sendJSON(res, 200, books);
});
router.delete('/api/books', (req, res) => {
  if(req.url.query) {
    let booksSearched = books.find(movie => movie.id === req.url.query.id);
    books.splice(books.indexOf(booksSearched), 1);
    return booksSearched ? sendStatus(res, 204, 'Book Deleted')
    : sendStatus(res, 404, 'Selection did not match any books');
  }
  return sendStatus(res, 200, 'No books found');
});

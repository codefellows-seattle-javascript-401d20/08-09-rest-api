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
      .then(notes => sendJSON(res, 200, notes))
      .catch(err => {
        console.error(err);
        sendStatus(res, 500);
      });
  }
});

// DELETE /api/<resource-name?id={id}>
// the route should delete a note with the given id
// on success this should return a 204 status code with no content in the body
// on failure due to lack of id in the query respond with a 400 status code
// on failure due to a resouce with that id not existing respond with a 404 status code
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

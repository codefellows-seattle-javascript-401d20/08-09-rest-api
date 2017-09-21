'use strict';

const Book = require('../model/book.js');
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

// POST /api/<resource-name>
// pass data as stringifed JSON in the body of a POST request to create a new resource
// on failure due to a bad request send a 400 status code
//  on success respond with a 200 status code and the created book
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

// GET /api/<resource-name> and GET /api/<resource-name>?id={id}
// with no id in the query string it should respond with an array of all of your resources
// with an id in the query string it should respond with the details of a specifc resource (as JSON)
// if the id is not found respond with a 404
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

// DELETE /api/<resource-name?id={id}>
// the route should delete a note with the given id
// on success this should return a 204 status code with no content in the body
// on failure due to lack of id in the query respond with a 400 status code
// on failure due to a resouce with that id not existing respond with a 404 status code
// router.get('/api/books', (req, res) => {
//   if(req.url.query.id){
//     if (books.find(book => book.id === req.url.query.id)){
//       let newBook = books.find(book => book.id === req.url.query.id);
//       sendJSON(res, 200, newBook);
//     } else {
//       return sendStatus(res, 404, 'no ID found');
//     }
//   }
//   return books;
// });

'use strict';

const Movie = require('../model/movie.js');
const router = require('../lib/router.js');

// store data while the server is running
let movies = [];

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

router.post('/api/movies', (req, res) => {
  if(!req.body)
    return sendStatus(res, 400, 'no body found');
  if(!req.body.title)
    return sendStatus(res, 400, 'no title found');
  if(!req.body.content)
    return sendStatus(res, 400, 'no content found');

  let movie = new Movie(req.body);
  movies.push(movie);
  sendJSON(res, 200, movie);
});
// POST /api/<resource-name>
// pass data as stringifed JSON in the body of a POST request to create a new resource
// on success respond with a 200 status code and the created note
// on failure due to a bad request send a 400 status code

router.get('/api/movies', (req, res) => {
  if(req.url.query) {
    let moviesSearched = movies.find(movie => movie.id === req.url.query);
    return moviesSearched ? sendJSON(res, 200, moviesSearched) : sendStatus(res, 404, 'selection did not match the movie');
  }
  return sendJSON(res, 200, movies);
});
router.delete('/api/movies', (req, res) => {
  if(req.url.query) {
    let moviesSearched = movies.find(movie => movie.id === req.url.query);
    return moviesSearched ? sendJSON(res, 200, moviesSearched) : sendStatus(res, 404, 'selection did not match the movie');
  }
  return sendJSON(res, 200, movies);
});

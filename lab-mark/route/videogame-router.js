'use strict';

const VideoGame = require('../model/videogame.js');
const router = require('../lib/router.js');

// store data while the server is running
let videogames = [];

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

router.post('/api/videogames', (req, res) => {
  if(!req.body)
    return sendStatus(res, 400, 'no body found');
  if(!req.body.title)
    return sendStatus(res, 400, 'no title found');
  if(!req.body.genre)
    return sendStatus(res, 400, 'no genre found');
  if(!req.body.console)
    return sendStatus(res, 400, 'no console found');

  let videogame = new VideoGame(req.body);
  videogames.push(videogame);
  sendJSON(res, 200, videogame);
});

router.get('/api/videogames', (req, res) => {
  // An ID was supplied, get it!
  if(req.url.query.id) {
    let queriedVideoGame = videogames.find(videogame => videogame.id === req.url.query.id);
    return queriedVideoGame ? sendJSON(res, 200, queriedVideoGame) : sendStatus(res, 404, 'id did not match any videogame');
  }

  // No ID provided, send all videogames
  return sendJSON(res, 200, videogames);
});

router.delete('/api/videogames', (req, res) => {
  if(req.url.query.id) {
    let queriedVideoGame = videogames.find(videogame => videogame.id === req.url.query.id);
    videogames.splice(videogames.indexOf(queriedVideoGame), 1);
    return queriedVideoGame ? sendStatus(res, 204, 'videogame removed') : sendStatus(res, 404, 'id did not match any videogame');
  }

  // Dont let them delete all videogames!
  return sendStatus(res, 400, 'no id found');
});

router.put('/api/videogames', (req, res) => {
  if(!req.body)
    return sendStatus(res, 400, 'no body found');
  if(!req.body.title)
    return sendStatus(res, 400, 'no title found');
  if(!req.body.genre)
    return sendStatus(res, 400, 'no genre found');
  if(!req.body.console)
    return sendStatus(res, 400, 'no console found');

  if(req.url.query.id) {
    let queriedVideoGame = videogames.filter(videogame => videogame.id === req.url.query.id);
    if(queriedVideoGame[0]) {
      queriedVideoGame[0].title = req.body.title;
      queriedVideoGame[0].genre = req.body.genre;
      queriedVideoGame[0].console = req.body.console;

      return sendJSON(res, 200, queriedVideoGame[0]);
    }
    return sendStatus(res, 404, 'id did not match any videogame');
  }
  return sendStatus(res, 400, 'no id found');
});

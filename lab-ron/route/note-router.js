'use strict';

const Note = require('../model/note.js');
const router = require('../lib/router.js');
const storage = require('../lib/storage.js');

let notes = [];

let sendStatus = (res, status, message) => {
  console.error('__REQUEST_ERROR__:', message);
  res.writeHead(status);
  res.end();
};

let sendJSON = (res, status, data) => {
  res.writeHead(status, {
    'Content-Type': 'application/json',
  });
  res.end(JSON.stringify(data));
};

router.post('/api/notes', (req, res) => {
  if (!req.body)
    return sendStatus(res, 400, 'no body found');
  if (!req.body.title)
    return sendStatus(res, 400, 'no title found');
  if (!req.body.content)
    return sendStatus(res, 400, 'no content found');

  let note = new Note(req.body);
  storage.setItem(note)
    .then(note => sendJSON(res, 200, note))
    .catch(err => {
      console.error(err);
      return sendStatus(res, 500);
    });
});

router.get('/api/notes', (req, res) => {
  if (req.url.query.id) {
    storage.fetchItem()(req.url.query.id)
      .then(note => sendJSON(res, 200, note))
      .catch(err => {
        console.error(err);
        if (err.message.indexOf('not found') > -1)
          return sendStatus(res, 404);
        sendStatus(500);
      });
  } else {
    storage.fetch()
      .then(notes => sendJSON(res, 200, notes))
      .catch(err => {
        console.error(err);
        sendStatus(res, 500);
      });
  }
});
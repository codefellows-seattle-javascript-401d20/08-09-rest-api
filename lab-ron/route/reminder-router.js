'use strict';

const Reminder = require('../model/reminder.js');
const router = require('../lib/router.js');
const storage = require('../lib/storage.js');



let sendStatus = (res, status, message) => {
  console.error('__REQUEST_ERROR__:', message);
  res.writeHead(status);
  res.end();
};

let sendJSON = (res, status, data) => {
  res.writeHead(status, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(data));
};

router.post('/api/reminders', (req, res) => {
  if (!req.body)
    return sendStatus(res, 400, 'no body found');
  if (!req.body.task)
    return sendStatus(res, 400, 'no task found');

  let reminder = new Reminder(req.body);
  storage.setItem(reminder)
    .then(reminder => sendJSON(res, 200, reminder))
    .catch(err => {
      console.error(err);
      return sendStatus(res, 500);
    });
});

router.get('/api/reminders', (req, res) => {
  if (req.url.query.id) {
    storage.fetchItem(req.url.query.id)
      .then(Reminder => sendJSON(res, 200, Reminder))
      .catch(err => {
        console.error(err);
        if (err.message.indexOf('not found') > -1)
          return sendStatus(res, 404);
        sendStatus(500);
      });
  } else {
    storage.fetch()
      .then(Reminders => sendJSON(res, 200, Reminders))
      .catch(err => {
        console.error(err);
        sendStatus(res, 500);
      });
  }
});

router.delete('/api/reminders', (req, res) => {
  if (req.url.query.id) {
    storage.deleteItem(req.url.query.id)
      .then(Reminder => sendJSON(res, 200, Reminder))
      .then(()=>console.log('item deleted'))
      .catch(err => {
        console.error(err);
        if (err.message.indexOf('not found') > -1)
          return sendStatus(res, 404);
        sendStatus(500);
      });
  }
});

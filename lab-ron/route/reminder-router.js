'use strict';

const Reminder = require('../model/reminder.js');
const router = require('../lib/router.js');

let reminders = [];

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
  if (!req.body.done)
    return sendStatus(res, 400, 'no done property set');

  let reminder = new Reminder(req.body);
  reminders.push(reminder);
  sendJSON(res, 200, reminder);
});


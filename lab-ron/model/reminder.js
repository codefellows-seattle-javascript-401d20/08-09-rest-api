'use strict';

const uuid = require('uuid/v1');

class Reminder {
  constructor(options) {
    this.id = uuid();
    this.timestamp = new Date();
    this.task = options.task;
    this.done = options.done || false;
  }
}

module.exports = Reminder;

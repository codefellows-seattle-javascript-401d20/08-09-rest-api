'use strict';

const uuid = require('uuid/v1');

class Reminder {
  constructor(options) {
    this.id = uuid();
    this.timestamp = new Date();
    this.todo = options.todo || '';
    this.completed = options.completed || false;
  }

  toString() {
    let isDone = this.completed ? 'done' : 'incomplete';
    return this.todo + ' - ' + isDone;
  }
}

module.exports = Reminder;

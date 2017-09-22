'use strict';

const uuid = require('uuid/v1');

class Beer {
  constructor(options){
    this.id = uuid();
    this.timestamp = new Date();
    this.title = options.title || '';
    this.type = options.type || '';
    this.abv = options.abv || '';
  }
}

module.exports = Beer;

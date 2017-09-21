'use strict'

const uuid = require('uuid/v1');

class Sandwich {
  constructor(options){
    this.id = uuid();
    this.timestamp = new Date();
    this.title = options.title || '';
    this.content = options.content || '';
  }

  toString(){
    return this.title + '\n' + this.content;
  }
}

module.exports = Sandwich;
'use strict';

const uuid = require('uuid/v1');

class Books {
  constructor(options){
    this.id = uuid();
    this.timestamp = new Date();
    this.title = options.title || 'Ender\'s Game';
    this.author = options.author || 'Orson Scott Card';
    this.mainCharacter = options.mainCharacter || 'Ender';
  }

  toString(){
    return this.title + '\n' + this.content;
  }
}

module.exports = Books;

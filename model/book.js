'use strict';

const uuid = require('uuid/v1');

class Book {
  constructor(options){
    this.id = uuid();
    this.title = options.title || '';
    this.author = options.author || '';
    this.description = options.description || '';
  }

  toString(){
    return this.title + '/n' + this.content + '/n' + this.description;
  }
}

module.exports = Book;

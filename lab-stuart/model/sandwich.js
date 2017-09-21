'use strict'

const uuid = require('uuid/v1');

class Sandwich {
  constructor(options){
    this.id = uuid();
    this.bread = options.bread || '';
    this.cheese = options.cheese || '';
    this.spread = options.spread || '';
  }

  toString(){
    return this.bread + '\n' + this.cheese + '\n' + this.spread;
  }
}

module.exports = Sandwich;
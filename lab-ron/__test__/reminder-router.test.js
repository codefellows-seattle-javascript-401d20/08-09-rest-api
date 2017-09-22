'use strict';

process.env.PORT = 7000;
process.env.STORAGE_PATH = `{/test-data.json}`;

const fs = require('fs-extra');
const superagent = require('superagent');
const server = require('../lib/server.js');

describe('/api/reminders'()=>{
  beforeAll(server.start);

});
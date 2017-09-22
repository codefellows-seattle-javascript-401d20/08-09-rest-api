'use strict';

process.env.PORT = 7000;
process.env.STORAGE_PATH = `${__dirname}/test-data.json`;

const fs = require('fs-extra');
const superagent = require('superagent');
const server = require('../lib/server.js');

let path = 'http://localhost:' + process.env.PORT;

let testData = () => {
  return superagent.post(path + '/api/reminders')
    .set('Content-Type', 'application/json')
    .send({
      task: 'Get Hair Moose',
    });
};

describe('/api/reminders', () => {
  beforeAll(server.start);
  afterAll(server.stop);

  afterAll(() => fs.remove(process.env.STORAGE_PATH));

  describe('POST /api/reminders', () => {
    test('should respond with a 200', testData)
      .then(res => {
        expect(res.status).toEqual(200);
        expect(res.body.task).toEqual('Get Hair Moose');
        expect(res.body.timestamp).toBeTruthy();
        expect(res.body.id).toBeTruthy();
        expect(res.body.done).toBeDefined();
      });
  });


  //   // test('shoudl respond with a 400', () => {

  //   // });

  // });

});
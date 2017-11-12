'use strict';

process.env.PORT = 7000;
process.env.STORAGE_PATH = `${__dirname}/test-data.json`;


const fs = require('fs-extra');
const superagent = require('superagent');
const server = require('../lib/server.js');

let path = 'http://localhost:' + process.env.PORT;

describe('/api/reminders', () => {
  beforeAll(server.start);
  afterAll(server.stop);
  afterAll(() => fs.remove(process.env.STORAGE_PATH));

  describe('POST /api/reminders', () => {
    test('should respond with a 200', () => {
      return superagent.post(`${path}/api/reminders`)
        .set('Content-Type', 'application/json')
        .send({
          task: 'Get Hair Moose',
        })
        .then(res => {
          expect(res.status).toEqual(200);
          expect(res.body.task).toEqual('Get Hair Moose');
          expect(res.body.timestamp).toBeTruthy();
          expect(res.body.id).toBeTruthy();
          expect(res.body.done).toBeDefined();
        });
    });

    test('should respond with a 400', () => {
      return superagent.post(`${path}/api/reminders`)
        .set('Content-Type', 'application/json')
        .then(Promise.reject)
        .catch(res => {
          expect(res.status).toEqual(400);
        });
    });
  });


  describe('GET /api/reminders', () => {
    test('should respond with 200', () => {
      return superagent.post(`${path}/api/reminders`)
        .set('Content-Type', 'application/json')
        .send({
          task: 'Take a Shower',
        })
        .then(res =>
          superagent.get(`${path}/api/reminders`)
            .query({ id: res.body.id }))
        .then(res => {
          expect(res.status).toEqual(200);
          expect(res.body.task).toEqual('Take a Shower');
          expect(res.body.id).toBeTruthy();
        });
    });

    test('should respond with 404 ', () => {
      return superagent.post(`${path}/api/reminders`)
        .set('Content-Type', 'application/json')
        .send({
          task: 'Take a Shower',
        })
        .then(() =>
          superagent.get(`${path}/api/reminders`)
            .query({ id: 'badID' }))
        .then(Promise.reject)
        .catch(res => {
          expect(res.status).toEqual(404);
        });
    });
  });
});
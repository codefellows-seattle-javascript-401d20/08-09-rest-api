'use strict';

// mock env
process.env.PORT = 4000;
require('dotenv').config();

const server = require('../lib/server.js');
const superagent = require('superagent');

describe('/api/movies', ()=> {
  afterAll(server.stop);
  beforeAll(server.start);

  describe('POST /api/movies', () => {
    test('should respond with a 200', () => {
      return superagent.post('http://localhost:7000/api/movies')
      .set('Content-Type', 'application/json')
      .send({
        title: 'brandon',
        content: 'is awesome',
      })
      .then(res => {
        expect(res.status).toEqual(200);
        expect(res.body.title).toEqual('brandon');
        expect(res.body.content).toEqual('is cool');
        expect(res.body.timestamp).toBeTruthy();
        expect(res.body.id).toBeTruthy();
      });
    });

    test('should resoind with a 400', () => {
      return superagent.post('http://localhost:7000/api/movies')
      .set('Content-Type', 'application/json')
      .send({
        content: 'cool beans',
      })
      .then(Promise.reject)
      .catch(res => {
        expect(res.status).toEqual(400);
      });
    });

    test('should resoind with a 400', () => {
      return superagent.post('http://localhost:7000/api/movies')
      .set('Content-Type', 'application/json')
      .send({
        title: 'hello world',
      })
      .then(Promise.reject)
      .catch(res => {
        expect(res.status).toEqual(400);
      });
    });
  });
});

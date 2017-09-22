'use strict'

process.env.PORT = 6000;
process.env.STORAGE_PATH = `${__dirname}/test-storage.json`;

const fs = require('fs-extra');
const superagent = require('superagent');
const server = require('../lib/server.js');

describe('/api/sandwiches', ()=> {
  beforeAll(server.start);
  afterAll(server.stop);

  afterAll(() => fs.remove(process.env.STORAGE_PATH));

  describe('POST /api/sandwiches', () => {
    test('should respond with a 200', () => {
      return superagent.post('http://localhost:6000/api/sandwiches')
      .set('Content-Type', 'application/json')
      .send({
        bread: 'White',
        cheese: 'American', 
        spread: 'Miracle Whip',
      })
      .then(res => {
        expect(res.status).toEqual(200);
        expect(res.body.bread).toEqual('White');
        expect(res.body.cheese).toEqual('American');
        expect(res.body.spread).toEqual('Miracle Whip');
        expect(res.body.id).toBeTruthy();
      });
    });

    test('should resoind with a 400', () => {
      return superagent.post('http://localhost:6000/api/sandwiches')
      .set('Content-Type', 'application/json')
      .send({
        bread: 'White',
      })
      .then(Promise.reject)
      .catch(res => {
        expect(res.status).toEqual(400);
      });
    });

    test('should resoind with a 400', () => {
      return superagent.post('http://localhost:6000/api/sandwiches')
      .set('Content-Type', 'application/json')
      .send({
        cheese: 'American',
      })
      .then(Promise.reject)
      .catch(res => {
        expect(res.status).toEqual(400);
      });
    });
  });

  describe('GET /api/sandwiches', () => {
    test('should return an array', () => {
      return superagent.get('http://localhost:6000/api/sandwiches')
      .then(res => {
        expect(res.status).toEqual(200);
        expect(res.body). toBeInstanceOf(Array);
      });
    });
  });
});

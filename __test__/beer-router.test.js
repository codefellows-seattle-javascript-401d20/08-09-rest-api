'use strict';

// mock env
process.env.PORT = 7000;
process.env.STORAGE_PATH = `${__dirname}/test-storage.json`;

const fs = require('fs-extra');
const superagent = require('superagent');
const server = require('../lib/server.js');

describe('/api/beers', ()=> {
  afterAll(server.stop);
  beforeAll(server.start);

  // this is a way you can clean up your test storage file
  // after every test so that each time your tests runs
  // it has a clean storage file to work with
  afterAll(() => fs.remove(process.env.STORAGE_PATH));

  describe('POST /api/beers', () => {
    test('should respond with a 200', () => {
      return superagent.post('http://localhost:7000/api/beers')
      .set('Content-Type', 'application/json')
      .send({
        title: 'Miller',
        type: 'lager',
        abv: '4.2',
      })
      .then(res => {
        expect(res.status).toEqual(200);
        expect(res.body.title).toEqual('Miller');
        expect(res.body.type).toEqual('lager');
        expect(res.body.abv).toBeEqual('4.2');
        expect(res.body.id).toBeTruthy();
      });
    });

    test('should resoind with a 400', () => {
      return superagent.post('http://localhost:7000/api/beers')
      .set('Content-Type', 'application/json')
      .send({
        type: 'lager',
      })
      .then(Promise.reject)
      .catch(res => {
        expect(res.status).toEqual(400);
      });
    });

    test('should resoind with a 400', () => {
      return superagent.post('http://localhost:7000/api/beers')
      .set('Content-Type', 'application/json')
      .send({
        title: 'Miller',
      })
      .then(Promise.reject)
      .catch(res => {
        expect(res.status).toEqual(400);
      });
    });
  });

  describe('GET /api/beers', () => {
    test('should return an array', () => {
      return superagent.get('http://localhost:7000/api/beers')
      .then(res => {
        console.log(res.body);
        expect(res.status).toEqual(200);
        expect(res.body).toBeInstanceOf(Array);
      });
    });
  });
});

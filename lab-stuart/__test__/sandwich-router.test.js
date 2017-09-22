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

    test('should respond with a 400', () => {
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

    test('should respond with a 400', () => {
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
        console.log(res.body)
        expect(res.status).toEqual(200);
        expect(res.body). toBeInstanceOf(Array);
      });
    });
  });

  describe('GET /api/sandwiches?id=none', () => {
    test('should return a 404', () => {
      return superagent.get('http://localhost:6000/api/sandwiches?id=none')
      .then(Promise.reject)
      .catch(res => {
        expect(res.status).toEqual(404);
      });
    });
  });
  
  describe(`GET /api/sandwiches?id=validID`, () => {
    test('should return a 200', () => {
      return superagent.get(`http://localhost:6000/api/sandwiches?id=72e5fa10-9fb9-11e7-8cdb-05ae0ff45435`)
      .then(Promise.reject)
      .catch(res => {
        expect(res.status).toEqual(200);
      });
    });
  });

  describe('DELETE /api/sandwiches', () => {
    test('should return a 404', () => {
      return superagent.delete('http://localhost:6000/api/sandwiches')
      .catch(res => {
        expect(res.status).toEqual(400);
      });
    });
  });

  describe('DELETE /api/sandwiches?id=none', () => {
    test('should return a 404', () => {
      return superagent.delete('http://localhost:6000/api/sandwiches?id=none')
      .catch(res => {
        expect(res.status).toEqual(404);
      });
    });
  });
  
  describe(`DELETE /api/sandwiches?id=validID`, () => {
    test('should return a 204', () => {
      return superagent.delete(`http://localhost:6000/api/sandwiches?id=72e5fa10-9fb9-11e7-8cdb-05ae0ff45435`)
      .then(Promise.reject)
      .catch(res => {
        expect(res.status).toEqual(204);
      });
    });
  });
  
});

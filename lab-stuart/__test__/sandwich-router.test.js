'use strict'

process.env.PORT = 6000;
process.env.STORAGE_PATH = `${__dirname}/test-storage.json`;

const fs = require('fs-extra');
const superagent = require('superagent');
const server = require('../lib/server.js');
const storage = require('../lib/storage.js');
const Sandwich = require('../model/sandwich.js');

let createMockSandwich = () => storage.setItem(new Sandwich({
  bread: 'White',
  cheese: 'American', 
  spread: 'Miracle Whip',
}));

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

  describe('GET /api/sandwiches?id=invalid', () => {
    test('should return a 404', () => {
      return superagent.get('http://localhost:6000/api/sandwiches?id=invalid')
      .then(Promise.reject)
      .catch(res => {
        expect(res.status).toEqual(404);
      });
    });
  });
  
  describe(`GET /api/sandwiches?id=validID`, () => {
    test('should return a 200', () => {
      let mockSandwich;
      return createMockSandwich()
      .then(sandwich => {
        mockSandwich = sandwich
        return superagent.get(`http://localhost:6000/api/sandwiches`)
          .query({ id: sandwich.id });
      })
      .then(res => {
        expect(res.status).toEqual(200);
        expect(res.body.id).toEqual(mockSandwich.id);
      });
    });
  });

  describe('DELETE /api/sandwiches', () => {
    test('should return a 400', () => {
      return superagent.delete('http://localhost:6000/api/sandwiches')
      .then(Promise.reject)
      .catch(res => {
        expect(res.status).toEqual(400);
      });
    });
  });

  describe('DELETE /api/sandwiches?id=invalid', () => {
    test('should return a 404', () => {
      let mockSandwich;
      return createMockSandwich()
      .then(sandwich => {
        mockSandwich = sandwich
        return superagent.get(`http://localhost:6000/api/sandwiches`)
          .query({ id: 0 });
      })
      .then(Promise.reject)
      .catch(res => {
        expect(res.status).toEqual(404);
      });
    });
  });
  
  describe(`DELETE /api/sandwiches?id=validID`, () => {
    test('should respond with a 200 response', () => {
      return createMockSandwich()
      .then(sandwich => {
        return superagent.delete(`http://localhost:6000/api/sandwiches`)
          .query({ id: sandwich.id });
      })
      .then(res => {
        expect(res.status).toEqual(204);
      });
    });
  });
  
});

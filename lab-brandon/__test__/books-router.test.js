'use strict';

process.env.PORT = 4000;
require('dotenv').config();

const server = require('../lib/server.js');
const superagent = require('superagent');

describe('/api/books', ()=> {
  afterAll(server.stop);
  beforeAll(server.start);

  describe('POST /api/books', () => {
    test('should respond with a 200', () => {
      return superagent.post('http://localhost:7000/api/books')
      .set('Content-Type', 'application/json')
      .send({
        title: 'Ender\'s Game',
        author: 'Orson Scott Card',
        mainCharacter: 'Ender',
      })
      .then(res => {
        expect(res.status).toEqual(200);
        expect(res.body.title).toEqual('Ender\'s Game');
        expect(res.body.author).toEqual('Orson Scott Card');
        expect(res.body.mainCharacter).toEqual('Ender');
        expect(res.body.timestamp).toBeTruthy();
        expect(res.body.id).toBeTruthy();
      });
    });

    test('should respond with a 400', () => {
      return superagent.post(`http://localhost:${process.env.PORT}/api/books`)
      .set('Content-Type', 'application/json')
      .send({
        title: 'Ender\'s Game',
        author: 'Orson Scott Card',
        mainCharacter: 'Ender',
      })
      .then(Promise.reject)
      .catch(res => {
        expect(res.status).toEqual(400);
      });
    });

    test('should respond with a 404', () => {
      return superagent.post(`http://localhost:${process.env.PORT}/api/CHEESEHEAD`)
      .set('Content-Type', 'application/json')
      .send({
        title: 'hello world',
      })
      .then(Promise.reject)
      .catch(res => {
        expect(res.status).toEqual(404);
      });
    });
  });
});

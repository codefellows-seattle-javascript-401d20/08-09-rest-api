'use strict';

process.env.PORT = 7000;
process.env.STORAGE_PATH = `${__dirname}/../storage.json`;

const fs = require('fs-extra');
const superagent = require('superagent');
const server = require('../lib/server.js');

describe('/api/books', ()=> {
  beforeAll(server.start);
  afterAll(server.stop);

  // Uncomment the line below to remove the JSON file after creating it
  // afterAll(() => fs.remove(process.env.STORAGE_PATH));

  describe('POST /api/books', () => {
    test('should respond with a 200 for a request made with a valid id', () => {
      return superagent.post('http://localhost:7000/api/books')
        .set('Content-Type', 'application/json')
        .send({
          title: 'The Haunting of Hill House',
          author: 'Shirley Jackson',
          description: 'First published in 1959, Shirley Jackson\'s The Haunting of Hill House has been hailed as a perfect work of unnerving terror. It is the story of four seekers who arrive at a notoriously unfriendly pile called Hill House: Dr. Montague, an occult scholar looking for solid evidence of a "haunting"; Theodora, his lighthearted assistant; Eleanor, a friendless, fragile young woman well acquainted with poltergeists; and Luke, the future heir of Hill House. At first, their stay seems destined to be merely a spooky encounter with inexplicable phenomena. But Hill House is gathering its powers—and soon it will choose one of them to make its own.',
        })
        .then(res => {
          expect(res.status).toEqual(200);
          expect(res.body.title).toEqual('The Haunting of Hill House');
          expect(res.body.author).toEqual('Shirley Jackson');
          expect(res.body.description).toEqual('First published in 1959, Shirley Jackson\'s The Haunting of Hill House has been hailed as a perfect work of unnerving terror. It is the story of four seekers who arrive at a notoriously unfriendly pile called Hill House: Dr. Montague, an occult scholar looking for solid evidence of a "haunting"; Theodora, his lighthearted assistant; Eleanor, a friendless, fragile young woman well acquainted with poltergeists; and Luke, the future heir of Hill House. At first, their stay seems destined to be merely a spooky encounter with inexplicable phenomena. But Hill House is gathering its powers—and soon it will choose one of them to make its own.');
          expect(res.body.id).toBeTruthy();
        });
    });

    test('should respond with a 400 if no request body was provided or the body was invalid', () => {
      return superagent.post('http://localhost:7000/api/books')
        .set('Content-Type', 'application/json')
        .send({
          description: 'jnjhbjhbhb',
        })
        .then(Promise.reject)
        .catch(res => {
          expect(res.status).toEqual(400);
        });
    });

    test('should respond with a 400 if no request body was provided or the body was invalid', () => {
      return superagent.post('http://localhost:7000/api/books')
        .set('Content-Type', 'application/json')
        .send({
          author: 'lol',
        })
        .then(Promise.reject)
        .catch(res => {
          expect(res.status).toEqual(400);
        });
    });

    test('should respond with a 400 if no request body was provided or the body was invalid', () => {
      return superagent.post('http://localhost:7000/api/books')
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

  describe('GET /api/books', () => {
    test('should respond with a 200 if it contains a response body for a request made with a valid id', () => {
      return superagent.post('http://localhost:7000/api/books')
        .set('Content-Type', 'application/json')
        .send({
          title: 'The Haunting of Hill House',
          author: 'Shirley Jackson',
          description: 'First published in 1959, Shirley Jackson\'s The Haunting of Hill House has been hailed as a perfect work of unnerving terror. It is the story of four seekers who arrive at a notoriously unfriendly pile called Hill House: Dr. Montague, an occult scholar looking for solid evidence of a "haunting"; Theodora, his lighthearted assistant; Eleanor, a friendless, fragile young woman well acquainted with poltergeists; and Luke, the future heir of Hill House. At first, their stay seems destined to be merely a spooky encounter with inexplicable phenomena. But Hill House is gathering its powers—and soon it will choose one of them to make its own.',
        })
        .then(res => {
          return superagent.get(`http://localhost:${process.env.PORT}/api/books`)
            .query({ id: res.body.id });
        })
        .then(res => {
          expect(res.status).toEqual(200);
          expect(res.body.title).toEqual('The Haunting of Hill House');
          expect(res.body.author).toEqual('Shirley Jackson');
          expect(res.body.description).toEqual('First published in 1959, Shirley Jackson\'s The Haunting of Hill House has been hailed as a perfect work of unnerving terror. It is the story of four seekers who arrive at a notoriously unfriendly pile called Hill House: Dr. Montague, an occult scholar looking for solid evidence of a "haunting"; Theodora, his lighthearted assistant; Eleanor, a friendless, fragile young woman well acquainted with poltergeists; and Luke, the future heir of Hill House. At first, their stay seems destined to be merely a spooky encounter with inexplicable phenomena. But Hill House is gathering its powers—and soon it will choose one of them to make its own.');
          expect(res.body.id).toBeTruthy();
        });
    });

    test('should respond with a 404 if a valid request is made with an ID that was not found', () => {
      return superagent.get(`http://localhost:${process.env.PORT}/api/books`)
        .query({ id: 'testytesttest' })
        .then(Promise.reject)
        .catch(res => {
          expect(res.status).toEqual(404);
        });
    });
  });
});

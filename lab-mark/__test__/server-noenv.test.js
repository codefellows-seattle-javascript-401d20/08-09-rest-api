'use strict';

const server = require('../lib/server.js');

describe('server with no env', () => {
  afterAll(server.stop);
  test('should not be able to start if process.env.PORT is not set', () => {
    return server.start()
      .then(Promise.next)
      .catch(err => {
        expect(err.message).toEqual('__ENV_ERROR__ process.env.PORT must be set');
      });
  });
});

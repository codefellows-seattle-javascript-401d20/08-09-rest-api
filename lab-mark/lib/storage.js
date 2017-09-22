'use strict';

const fs = require('fs-extra');

fs.pathExists(process.env.STORAGE_PATH)
  .then((exists) => {
    if(!exists)
      fs.writeJSON(process.env.STORAGE_PATH, []);
  });

const storage = module.exports = {};

storage.fetch = () => {
  return fs.readJSON(process.env.STORAGE_PATH);
};

storage.setItem = (item) => {
  if(!item.id)
    return Promise.reject(new Error('__STORAGE_ERROR__ item must have an id'));
  return storage.fetch()
    .then(items => {
      return fs.writeJSON(process.env.STORAGE_PATH, [...items, item]);
    })
    .then(() => item);
};


storage.fetchItem = (id) => {
  return storage.fetch()
    .then(items => items.find(item => item.id === id))
    .then(item => {
      if(!item)
        throw new Error('__STORAGE_ERROR__ item not found');
      return item;
    });
};

storage.deleteItem = (id) => {
  return storage.fetch()
    .then(items => {
      if(items.find(item => item.id === id))
        return items.filter((item) => item.id !== id);
      throw new Error('__STORAGE_ERROR__ item not found');
    })
    .then(items => fs.writeJSON(process.env.STORAGE_PATH, items));
};

storage.updateItem = (id, body) => {
  let videogame;
  return storage.fetch()
    .then(items => {
      if(items.find(item => item.id === id)) {
        videogame = items.filter((item) => item.id === id);
        videogame[0].title = body.title;
        videogame[0].genre = body.genre;
        videogame[0].console = body.console;
        return items;
      }
      throw new Error('__STORAGE_ERROR__ item not found');
    })
    .then(items => fs.writeJSON(process.env.STORAGE_PATH, items));
};

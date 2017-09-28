## Lab 08-09 - Rest API

## About
This is a REST API for tracking sandwich recipies.

## Setup
First set Environment Variables
* `export PORT=5000` 
* `export STORAGE_PATH=/home/Django/401/labs/08-09-rest-api/lab-stuart/storage.json`

To start the server run the following command `node index.js`.  

## API

#### /api/sandwiches

- POST requires a JSON object with bread, cheese, and spread values.
- GET retrieves an array of sandwich objects without id parameter, or a single sandwich if id= param is included with valid id.
- DELETE requires a valid id parameter or returns 404.

## Persistence

- Sandwiches are written to /storage.json with fs.writefile to persist as a JSON file / object.
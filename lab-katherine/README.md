![cf](https://i.imgur.com/7v5ASc8.png) Lab 08: REST API
======

## Server Endpoints
* Post: intakes stringifed JSON for a book's data in the body of a request in order to create a new resource. If the request succeeds, a 200 status code and created book are output. If it fails, through invalid input, a 400 status code is output. If some other reason causes an error, a 500 status code is output.
* Get: intakes stringifed JSON for a book's data in the body of a request in order to fetch an existing resource. If it succeeds, it should output the requested resource as JSON. If it fails due to a lack of ID in the query, a 400 status code is output. If it fails due to a resource with the ID specified in the query not existing, a 404 status code is output. If it fails for some other reason, a 500 status code is output
* Delete: intakes stringifed JSON for a book's data in the body of a request in order to select an existing resource to delete. If it succeeds, a 204 status code with no content in the body is output. If it fails due to a the queried ID not existing, the program responds by outputting a 404 status code. If it fails due to a lack of an ID in the query, a 400 status code is output. If it fails due to another reason, a 500 status code is output

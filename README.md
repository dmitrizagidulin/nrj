nrj
===

A Node.js client for Riak Json document store framework

## Installation
```
npm install nrj
```

## Usage

Create a client, and reference a new or existing collection.
```js
var riak_json = require('nrj');
var client = riak_json.Client.getClient();
var collection = client.collection('cities');
```

You can now perform CRUD operations on JSON documents and collections:
```js
var doc = new riak_json.RJDocument('nyc', {city: 'New York', state: 'NY'}); // key = 'nyc'
collection.insert(doc);

collection.find_by_key('nyc'); // => {city: 'New York', state: 'NY'}

collection.remove(doc);  // => deletes the document at key 'nyc'
```

### Unit Testing
```
npm test
```
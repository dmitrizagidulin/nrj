nrj
===

A Node.js client for [RiakJson](https://github.com/basho-labs/riak_json/) document store framework

## Installation
```
npm install -g nrj
```

## Usage

### Creating / Referencing a Collection
Create a client, and reference a new or existing collection. 
*Note: On the server side, the collection is only created, in any real sense, when either the first document is inserted, or
the collection indexing schema is saved.*

```js
var riak_json = require('nrj');
var client = riak_json.Client.getClient();  // default http host and port
var cities_collection = client.collection('cities');
```

### Solr Schema Administration
You may set an optional Solr indexing schema for a RiakJson collection, by specifying which fields it should index, and how.

If you do not set an explicit schema, and start inserting documents into a collection, RiakJson will
attempt to [infer a schema](https://github.com/basho-labs/riak_json/blob/master/docs/architecture.md#inferred-schemas) based 
on the document's structure (keep in mind, though, that the derived schema attempts to index *every* field in the document).

Supported Solr indexing field types:
 - ```string``` (no spaces, think of a url slug)
 - ```text``` (spaces allowed, Solr 'text_general' type field)
 - ```multi_string``` (an array of strings, no spaces)
 - ```integer```
 - ```number``` (floating point, Solr type 'tdouble')
 - ```location``` (flat geospatial field, Solr 'location'/LatLonType type field)
 - ```location_rpt``` (spherical geospatial, Solr 'location_rpt'/SpatialRecursivePrefixTreeFieldType type field)

```js
schema = cities_collection.new_schema();  // get a new CollectionSchema object
schema.addTextField(name='city', required=true);
schema.addStringField('state', true);
schema.addMultiStringField('zip_codes');  // required: false
schema.addIntegerField('population');
schema.addStringField('country', true);
cities_collection.set_schema(schema);
```

You can now retrieve the stored schema (once RiakJson and Solr has had a chance to process it).
```js
schema_fields = cities_collection.get_schema(function(result) { console.log(result) })
//   [{
//      name: "city",
//      type: "text",
//      require: true
//    }, {
//      name: "state",
//      type: "string",
//      require: true
//    }, {
//      name: "zip_codes",
//      type: "multi_string",
//      require: false
//    }, {
//      name: "population",
//      type: "integer",
//      require: false
//    }, {
//      name: "country",
//      type: "string",
//      require: true
//    }]
```

### K/V - Reading and Writing Documents
You can now perform CRUD operations on JSON documents and collections:
```js
var doc = new riak_json.RJDocument('nyc', {city: 'New York', state: 'NY'}); // key = 'nyc'
collection.insert(doc);

collection.find_by_key('nyc'); // => {city: 'New York', state: 'NY'}

collection.remove(doc);  // => deletes the document at key 'nyc'
```

### Solr Search / Querying RiakJson
See [RiakJson Query Docs](https://github.com/basho-labs/riak_json/blob/master/docs/query.md) 
for a complete list of valid query parameters.

### Unit Testing
```
npm test
```
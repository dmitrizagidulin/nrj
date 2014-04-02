/* -*- mode: js2; js2-basic-offset: 2; indent-tabs-mode: nil -*- */
/**
This file is provided to you under the Apache License,
Version 2.0 (the "License"); you may not use this file
except in compliance with the License. You may obtain
a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing,
software distributed under the License is distributed on an
"AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, either express or implied. See the License for the
specific language governing permissions and limitations
under the License.
**/
var CollectionSchema = require('./collection_schema');

var Collection = function Collection(name, client) {
  this.name = name;
  this.client = client;
}

Collection.prototype.delete_raw_json = function delete_raw_json(key, callback) {
  this.client.delete_raw_json(this.name, key, callback);
}

Collection.prototype.find_by_key = function find_by_key(key, callback) {
  this.get_raw_json(key, callback);
}

Collection.prototype.find_all = function find_all(query, callback) {
  this.client.get_query_all(this.name, query, callback);
}

Collection.prototype.find_one = function find_one(query, callback) {
  this.client.get_query_one(this.name, query, callback);
}

Collection.prototype.get_raw_json = function get_raw_json(key, callback) {
  this.client.get_json_object(this.name, key, callback);
}

Collection.prototype.get_schema = function get_schema(callback) {
  this.client.get_schema_json(this.name, callback);
}

Collection.prototype.insert = function insert(doc, callback) {
  this.insert_raw_json(doc.key, doc.to_json_document, callback);
}

Collection.prototype.insert_raw_json = function insert_raw_json(key, json_obj, callback) {
  this.client.insert_raw_json(this.name, key, json_obj, callback);
}

Collection.prototype.new_schema = function new_schema() {
  return new CollectionSchema(this.name);
}

Collection.prototype.remove = function remove(doc, callback) {
  this.delete_raw_json(doc.key, callback);
}

Collection.prototype.update_raw_json = function update_raw_json(key, json_obj, callback) {
  this.client.update_raw_json(this.name, key, json_obj, callback);
}

Collection.prototype.set_schema = function set_schema(schema, callback) {
  var schema_fields;
  
  if(!schema) {
    throw "Invalid schema object";
  }
  if(schema instanceof CollectionSchema) {
    schema_fields = schema.build();
  } else {
    schema_fields = schema;
  }
  
  this.client.set_schema(this.name, schema_fields, callback);
}

module.exports.Collection = Collection;

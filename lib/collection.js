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
var CollectionSchema = require('./collection_schema')

var Collection = function Collection(name, client) {
  this.name = name
  this.client = client

  this.delete_raw_json = function delete_raw_json(key, callback) {
    this.client.delete_raw_json(this.name, key, callback)
  }
  
  this.find_by_key = function find_by_key(key, callback) {
    this.get_raw_json(key, callback)
  }

  this.find_all = function find_all(query, callback) {
    this.client.get_query_all(this.name, query, callback)
  }
  
  this.find_one = function find_one(query, callback) {
    this.client.get_query_one(this.name, query, callback)
  }
  
  this.get_raw_json = function get_raw_json(key, callback) {
    this.client.get_json_object(this.name, key, callback)
  }
  
  this.insert = function insert(doc, callback) {
    this.insert_raw_json(doc.key, doc.to_json_document, callback)
  }
  
  this.insert_raw_json = function insert_raw_json(key, json_obj, callback) {
    this.client.insert_raw_json(this.name, key, json_obj, callback)
  }

  this.new_schema = function new_schema() {
    return new CollectionSchema(this.name)
  }
  
  this.remove = function remove(doc, callback) {
    this.delete_raw_json(doc.key, callback)
  }
  
  this.update_raw_json = function update_raw_json(key, json_obj, callback) {
    this.client.update_raw_json(this.name, key, json_obj, callback)
  }
}

module.exports.Collection = Collection
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

var request = require('superagent')
var collection = require('./collection')

var SuperagentTransport = function SuperagentTransport() {
  this.delete_request = function(url, callback) {
    request.del(url).end(function(err, res){
      callback(err, res)
    })
  }
  
  this.get_body = function(path, callback) {
    var err = null
    request.get(path)
      .type('json')
      .end(function(err, res){
        callback(err, res.body)
      })
  }
  
  this.get_text = function(path, callback) {
    var err = null
    request.get(path)
      .type('json')
      .end(function(err, res){
        callback(err, res.text)
      })
  }

  this.post_request = function(url, json_obj, callback) {
    request.post(url)
      .type('json')
      .set('Accept', 'application/json')
      .send(json_obj)
      .end(function(err, res){
        callback(err, res)
      })
  }
  
  this.put_request = function(url, json_obj, callback) {
    request.put(url)
      .type('json')
      .set('Accept', 'application/json')
      .send(json_obj)
      .end(function(err, res){
        callback(err, res)
      })
  }
}

var RiakJsonClient = function RiakJsonClient(host, port, transport) {
  this.host  = host || '127.0.0.1'
  this.port = port || 8098
  this.transport = transport || new SuperagentTransport()
  
  this.collection = function(name) {
    return new collection.Collection(name, this)
  }
  
  this.collection_url = function(collection_name) {
    return this.base_riak_url() + this.base_collection_path() + collection_name
  }
  
  this.base_collection_path = function() {
    return this.base_riak_json_path() + "collection/"
  }
  
  this.base_riak_path = function() {
    return "/"
  }
  
  this.base_riak_url = function() {
    return "http://"+this.host+":"+this.port
  }
  
  this.base_riak_json_path = function() {
    return this.base_riak_path() + "document/"
  }
  
  this.delete_raw_json = function(collection_name, key, callback) {
    var url = this.collection_url(collection_name) + "/" + key
    this.transport.delete_request(url, function(err, res) {
      callback(err)
    })
  }
  
  this.get_json_object = function(collection_name, key, callback) {
    var url = this.collection_url(collection_name)+"/"+key
    this.transport.get_body(url, function(err, response_body){
      callback(err, response_body)
    })
  }
  
  this.get_query_all = function get_query_all(collection_name, query, callback) {
    var url = this.collection_url(collection_name)+'/query/all'
    this.transport.put_request(url, query, function(err, res){
      callback(err)
    })
  }
  
  this.get_query_one = function get_query_one(collection_name, query, callback) {
    var url = this.collection_url(collection_name)+'/query/one'
    this.transport.put_request(url, query, function(err, res){
      callback(err)
    })
  }
  
  this.get_schema_json = function get_schema_json(collection_name, callback) {
    var url = this.collection_url(collection_name)+'/schema'
    this.transport.get_body(url, function(err, response_body){
      callback(err, response_body)
    })
  }
  
  this.insert_raw_json = function(collection_name, key, json_obj, callback) {
    if(key) {
      var url = this.collection_url(collection_name)+"/"+key
      this.transport.put_request(url, json_obj, function(err, res){
        callback(err, key)
      })
    }
  }
  
  this.ping = function(callback) {
    var url = this.base_riak_url() + '/ping'
    this.transport.get_text(url, callback)
  }
  
  this.set_schema = function set_schema(collection_name, schema_fields, callback) {
    var url = this.collection_url(collection_name)+'/schema'
    this.transport.put_request(url, schema_fields, function(err, res){
      if(callback) {
        callback(err, res)
      }
    })
  }
  
  this.update_raw_json = function(collection_name, key, json_obj, callback) {
    var url = this.collection_url(collection_name) + "/" + key
    this.transport.put_request(url, json_obj, function(err, res) {
      callback(err, key)
    })
  }
  //  this.post_to_collection = function(collection_name, json) {
//    var url = this.collection_url(collection_name)
//    
//  }
}

var getClient = function() {
  var client = new RiakJsonClient()
  return client
}

module.exports.RiakJsonClient = RiakJsonClient
module.exports.getClient = getClient
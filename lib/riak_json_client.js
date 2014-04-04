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

var collection = require('./collection');

var RiakJsonClient = function RiakJsonClient(host, port, transport) {
  this.host  = host || '127.0.0.1';
  this.port = port || 8098;
  this.transport = transport;

  if(!this.transport) {
    SuperagentTransport = require('./superagent_transport');
    this.transport = new SuperagentTransport();
  }
}

RiakJsonClient.prototype.collection = function (name) {
  return new collection.Collection(name, this);
}

RiakJsonClient.prototype.collection_url = function collection_url(collection_name) {
  return this.base_riak_url() + this.base_collection_path() + collection_name;
}

RiakJsonClient.prototype.base_collection_path = function base_collection_path() {
  return this.base_riak_json_path() + "collection/";
}

RiakJsonClient.prototype.base_riak_path = function base_riak_path() {
  return "/";
}

RiakJsonClient.prototype.base_riak_url = function base_riak_url() {
  return "http://"+this.host+":"+this.port;
}

RiakJsonClient.prototype.base_riak_json_path = function base_riak_json_path() {
  return this.base_riak_path() + "document/";
}

RiakJsonClient.prototype.delete_raw_json = function delete_raw_json(collection_name, key, callback) {
  var url = this.collection_url(collection_name) + "/" + key;
  this.transport.delete_request(url, function(err, res) {
    callback(err);
  })
}

RiakJsonClient.prototype.get_json_object = function get_json_object(collection_name, key, callback) {
  var url = this.collection_url(collection_name)+"/"+key;
  this.transport.get_body(url, function(err, response_body) {
    callback(err, response_body);
  });
}

RiakJsonClient.prototype.get_query_all = function get_query_all(collection_name, query, callback) {
  var url = this.collection_url(collection_name)+'/query/all';
  this.transport.put_request(url, query, function(err, res) {
    callback(err);
  })
}

RiakJsonClient.prototype.get_query_one = function get_query_one(collection_name, query, callback) {
  var url = this.collection_url(collection_name)+'/query/one';
  this.transport.put_request(url, query, function(err, res) {
    callback(err);
  })
}

RiakJsonClient.prototype.get_schema_json = function get_schema_json(collection_name, callback) {
  var url = this.collection_url(collection_name)+"/schema";
  this.transport.get_body(url, function(err, response_body) {
    callback(err, response_body);
  });
}

RiakJsonClient.prototype.insert_raw_json = function insert_raw_json(collection_name, key, json_obj, callback) {
  if(key) {
    var url = this.collection_url(collection_name)+"/"+key;
    this.transport.put_request(url, json_obj, function(err, res) {
      if(callback) {
        callback(err, key);
      }
    })
  }
}

RiakJsonClient.prototype.ping = function ping(callback) {
  var url = this.base_riak_url() + '/ping';
  this.transport.get_text(url, callback);
}

RiakJsonClient.prototype.set_schema = function set_schema(collection_name, schema, callback) {
  var url = this.collection_url(collection_name) + "/schema";
  this.transport.put_request(url, schema, function(err, res) {
    if(callback) {
      callback(err, res);
    }
  });
}

RiakJsonClient.prototype.update_raw_json = function update_raw_json(collection_name, key, json_obj, callback) {
  var url = this.collection_url(collection_name) + "/" + key;
  this.transport.put_request(url, json_obj, function(err, res) {
    callback(err, key);
  });
}

var getClient = function() {
  var client = new RiakJsonClient();
  return client;
}

module.exports.RiakJsonClient = RiakJsonClient;
module.exports.getClient = getClient;

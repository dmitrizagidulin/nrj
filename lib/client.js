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

//var request = require('superagent')
var http = require('http')
var collection = require('./collection')

var HTTPTransport = function HTTPTransport(host, port) {
  this.host = host
  this.port = port
  this.get_body = function(path, callback) {
    var options = {
      port : this.port,
      host : this.host,
      path : path,
      method : 'GET'
    }
    var err = null
    var req = http.request(options, function(res){
      res.on('data', function(body){
        callback(err, body.toString())
      })
    }).end()
  }
}

var RiakJsonClient = function RiakJsonClient(host, port, transport) {
  this.host  = host || '127.0.0.1'
  this.port = port || 8098
  this.transport = transport || new HTTPTransport(this.host, this.port)
  
  this.collection = function(name) {
    return new collection.Collection(name, this)
  }
  
  this.base_collection_path = function() {
    return this.base_riak_json_path() + "collection/"
  }
  
  this.base_riak_path = function() {
    return "/"
  }
  
  this.base_riak_json_path = function() {
    return this.base_riak_path() + "document/"
  }
  
  this.insert_raw_json = function(collection_name, key, json_obj) {
    
  }
  
  this.ping = function(callback) {
    var path = this.base_riak_path() + 'ping'
    this.transport.get_body(path, callback)
  }
}

var getClient = function() {
  var client = new RiakJsonClient()
  return client
}

exports.RiakJsonClient = RiakJsonClient
exports.getClient = getClient
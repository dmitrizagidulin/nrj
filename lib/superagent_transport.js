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

var request = require('superagent');

var SuperagentTransport = function SuperagentTransport() {
}

SuperagentTransport.prototype.delete_request = function delete_request(url, callback) {
    request.del(url).end(function(err, res) {
      callback(err, res);
    });
}

SuperagentTransport.prototype.get_body = function get_body(path, callback) {
  request.get(path)
    .type('json')
    .end(function(err, res) {
      callback(err, res.body);
    });
}

SuperagentTransport.prototype.get_text = function get_text(path, callback) {
  request.get(path)
    .type('json')
    .end(function(err, res) {
      callback(err, res.text);
    });
}

SuperagentTransport.prototype.post_request = function post_request(url, json_obj, callback) {
  request.post(url)
    .type('json')
    .set('Accept', 'application/json')
    .send(json_obj)
    .end(function(err, res) {
      callback(err, res);
    });
}

SuperagentTransport.prototype.put_request = function put_request(url, json_obj, callback) {
  request.put(url)
    .type('json')
    .set('Accept', 'application/json')
    .send(json_obj)
    .end(function(err, res) {
      callback(err, res);
    });
}

module.exports = SuperagentTransport;

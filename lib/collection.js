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

var Collection = function Collection(name, client) {
  this.name = name
  this.client = client
  
  this.insert_raw_json = function(key, json_obj, callback) {
    var returned_key = this.client.insert_raw_json(this.name, key, json_obj, callback)
    return returned_key
  }
}

module.exports.Collection = Collection
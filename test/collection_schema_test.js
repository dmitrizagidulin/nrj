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

var should = require('should')
var riak_json = require('../index.js')
var client = riak_json.Client.getClient()


describe("a Collection Schema", function() {
  it("a new schema can be created for a collection", function(done) {
    var collection = client.collection('cities')
    var schema = collection.new_schema()
    schema.should.be.instanceOf(riak_json.CollectionSchema)
    done()
  })
})
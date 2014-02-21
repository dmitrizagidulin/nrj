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

var should = require('should');
var riak_json = require('../index.js');

describe("a RiakJson Document", function() {
  it("has a key, and a body property containing attributes", function(done) {
    var test_key = 'doc123';
    var attributes = { field1: 1234, field2: 'abcd'};
    var doc = new riak_json.RJDocument(test_key, attributes);
    
    doc.key.should.equal(test_key);
    doc.body.should.have.property('field1');
    doc.body.should.have.property('field2');
    done();
  });
  
  it("can be converted to and from JSON strings", function(done) {
    var test_key = 'doc123';
    var attributes = { field1: 1234, field2: 'abcd'};
    var doc = new riak_json.RJDocument(test_key, attributes);
    
    var json_string = doc.to_json_document();
    json_string.should.be.type('string');
    json_string.should.not.be.empty;
    
    var parsed_json = JSON.parse(json_string);
    parsed_json.field1.should.equal(1234);
    parsed_json.field2.should.equal('abcd');
    done();
  });
});
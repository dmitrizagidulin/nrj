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
var client = riak_json.Client.getClient();

describe("a Collection Schema", function() {
  it("a new schema can be created for a collection", function(done) {
    var collection = client.collection('cities');
    var schema = collection.new_schema();
    schema.should.be.instanceOf(riak_json.CollectionSchema);
    schema.fields.should.have.lengthOf(0, "A new CollectionSchema should have no fields defined");
    done();
  });
  
  it("consists of fields of various types", function(done) {
    var collection = client.collection('cities');
    var schema = collection.new_schema();
    var field_name, required;
    
    schema.addTextField(field_name='city', required=true);
    schema.fields.should.have.lengthOf(1);
    
    schema.addStringField(field_name='state', required=true);
    schema.fields.should.have.lengthOf(2);
    
    schema.addMultiStringField(field_name='zip_codes');
    schema.fields.should.have.lengthOf(3);
    schema.fields[2].name.should.equal('zip_codes');
    schema.fields[2].require.should.be.false;  // Field is not required, by default

    schema.addIntegerField(field_name='population');
    schema.fields.should.have.lengthOf(4);
    done();
  });
});
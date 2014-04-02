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

describe("a Collection", function() {
  describe("can perform CRUD on raw JSON objects", function() {
    it("should be able to write raw JSON objects", function(done) {
      var collection = client.collection('cities');
      var test_key = 'document-key-123';
      var json_obj = { 'field_one': '123', 'field_two': 'abc' };
      collection.insert_raw_json(test_key, json_obj, function(err, returned_key) {
        should.not.exist(err);
        returned_key.should.equal(test_key);
        done();
      });
    });
    
    it("should be able to read raw JSON objects", function(done) {
      var collection = client.collection('cities');
      var test_key = 'document-key-123';
      // existing_json_obj should contain: { 'field_one': '123', 'field_two': 'abc' }
      collection.get_raw_json(test_key, function(err, doc) {
        should.not.exist(err);
        doc.field_one.should.equal('123');
        done();
      });
    });
    
    it("should be able to update raw JSON objects", function(done) {
      var collection = client.collection('cities');
      var test_key = 'document-key-123';
      // existing_json_obj should contain: { 'field_one': '123', 'field_two': 'abc' }
      var new_json = { 'field_one': '999', 'field_two': 'def' };
      collection.update_raw_json(test_key, new_json, function(err) {
        should.not.exist(err);
        // JSON object should be updated now. Read to verify new value
        collection.get_raw_json(test_key, function(err, updated_doc) {
          should.not.exist(err);
          updated_doc.field_one.should.equal('999');
          updated_doc.field_two.should.equal('def');
          done();
        });
      });
    });
    
    it("should be able to delete raw JSON objects", function(done) {
      var collection = client.collection('cities');
      var test_key = 'document-key-123';
      collection.delete_raw_json(test_key, function(err) {
        should.not.exist(err);
        // JSON object should be deleted now. Attempt to read, to ensure a 404
        collection.get_raw_json(test_key, function(err, updated_doc) {
          should.not.exist(err);
          done();
        });
      });
    });
  });

  describe("can perform schema administration", function() {
    function test_schema() {
      var required;
      var schema = client.collection('cities').new_schema();
      schema.addTextField('city', required=true);
      schema.addStringField('state', required=true);
      schema.addMultiStringField('zip_codes');
      schema.addIntegerField('population');
      return schema;
    }
    
    before(function() {
      var schema = test_schema();
      var collection = client.collection('cities');
      collection.set_schema(schema, function(){});
    });
    
    it("can read schemas", function(done) {
      var collection = client.collection('cities');
      collection.get_schema(function(err, schema) {
        should.not.exist(err);
        // JSON object should be deleted now. Attempt to read, to ensure a 404
        schema[0].name.should.equal('city');
        done();
      });
    });
  });
});
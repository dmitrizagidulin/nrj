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
var sinon = require('sinon');
var riak_json = require('../index.js');
var client = riak_json.Client.getClient();

describe("a Collection", function() {
  it("should have a name and client", function(done) {
    var collection = client.collection('cities');
    collection.should.have.property('name');
    collection.name.should.equal('cities');
    collection.should.have.property('client');
    done();
  });
  
  describe("can perform CRUD operations on documents", function() {
    it("can insert a document", function(done) {
      var mock = sinon.mock(client).expects("insert_raw_json").once();
      var collection = client.collection('cities');
      var doc = new riak_json.RJDocument('nyc', {city: 'New York', state: 'NY'});
      collection.insert(doc);
      mock.verify();
      client.insert_raw_json.restore();
      done();
    });
    
    it("can load a document by key", function(done) {
      var mock = sinon.mock(client).expects("get_json_object").once();
      var collection = client.collection('cities');
      collection.find_by_key('nyc');
      mock.verify();
      client.get_json_object.restore();
      done();
    });
    
    it("can delete a document", function(done) {
      var mock = sinon.mock(client).expects("delete_raw_json").once();
      var collection = client.collection('cities');
      var doc = new riak_json.RJDocument('nyc', {city: 'New York', state: 'NY'});
      collection.remove(doc);
      mock.verify();
      client.delete_raw_json.restore();
      done();
    });
  });
  
  describe("can query to find one or more documents", function() {
    it("query for one document via an exact field match", function(done) {
      var mock = sinon.mock(client).expects("get_query_one").once();
      var collection = client.collection('cities');
      var query = {city: 'New York'};  // Find the first document with the city field equal to 'New York'
      var callback;
      collection.find_one(query, callback);
      mock.verify();
      client.get_query_one.restore();
      done();;
    });
    
    it("query for all documents having an exact field match", function(done) {
      var mock = sinon.mock(client).expects("get_query_all").once();
      var collection = client.collection('cities');
      var query = {state: 'NY'};  // Find all documents with the state field equal to 'NY'
      var callback;
      collection.find_all(query, callback);
      mock.verify();
      client.get_query_all.restore();
      done();
    });
  });
});
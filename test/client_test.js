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

describe("Riak Json Client Test Suite", function() {
  it("should be a valid client with default host and port", function(done) {
    client.should.be.an.instanceOf(riak_json.Client.RiakJsonClient);
    client.should.have.property('host');
    client.should.have.property('port');
    client.should.have.property('transport');
    done();
  });
  
  it("should be able to ping the Riak Json cluster", function(done) {
    client.ping(function(err, response) {
      should.not.exist(err);
      response.should.equal("OK");
      done();
    });
  });
  
  it("should know the base Riak cluster and RiakJson urls", function(done) {
    client.base_riak_path().should.not.be.empty;
    client.base_riak_json_path().should.not.be.empty;
    client.base_collection_path().should.not.be.empty;
    done();
  });
  
  it("should know the url for a collection", function(done) {
    var host = '127.0.0.1';
    var port = 8098;
    var collection_name = 'test-collection';
    var client = riak_json.Client.getClient(host, port);
    client.collection_url(collection_name).should.equal('http://127.0.0.1:8098/document/collection/test-collection');
    done();
  });
  
  it("can perform a 'find one' query to a collection", function(done) {
    var mock = sinon.mock(client.transport).expects("put_request").once();
    var collection_name = 'cities';
    var query = {city: 'New York'};
    var callback;
    client.get_query_one(collection_name, query, callback);
    mock.verify();
    client.transport.put_request.restore();
    done();
  });
  
  it("can perform a 'find all' query to a collection", function(done) {
    var mock = sinon.mock(client.transport).expects("put_request").once();
    var collection_name = 'cities';
    var query = {state: 'NY'};
    var callback;
    client.get_query_all(collection_name, query, callback);
    mock.verify();
    client.transport.put_request.restore();
    done();
  });
});
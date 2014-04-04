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

var riak_json = require('../index.js');
var client = riak_json.Client.getClient();
var collection;
var schema;

console.log('Seeding test collections...');

console.log('  US Capitals')
var capitals = require('./seeds/us_capitals.js').USCapitals;

collection = client.collection('_nrj-test-us-capitals');
schema = collection.new_schema();
schema.addStringField('abbreviation', true);
schema.addTextField('name', true);
schema.addTextField('capital', true);
schema.addLocationRptField('capital_coords_rpt');
collection.set_schema(schema);

var state;
var state_doc;
for(var abbrev in capitals) {
  state_data = capitals[abbrev];
  state = {
      abbreviation: abbrev,
      name: state_data.name,
      capital: state_data.capital,
      capital_coords_rpt: state_data.lat + ',' + state_data.long
  }
  state_doc = new riak_json.RJDocument(abbrev, state); // key = two-letter state abbreviation
  collection.insert(state_doc);
  console.log('   insert '+abbrev+'.')
}
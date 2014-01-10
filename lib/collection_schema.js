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

var CollectionSchema = function CollectionSchema(collection_name) {
  this.collection_name = collection_name
  this.fields = []
  
  this.addField = function addField(field_type, field_name, required) {
    required = required || false
    this.fields.push({ name: field_name, type: field_type, require: required })
  }

  this.addIntegerField = function addStringField(field_name, required) {
    this.addField('integer', field_name, required)
  }
  
  this.addMultiStringField = function addStringField(field_name, required) {
    this.addField('multi_string', field_name, required)
  }
  
  this.addStringField = function addStringField(field_name, required) {
    this.addField('string', field_name, required)
  }
  
  this.addTextField = function addTextField(field_name, required) {
    this.addField('text', field_name, required)
  }
}

module.exports = CollectionSchema
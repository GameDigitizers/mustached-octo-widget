'use strict';

var mongoose = require('mongoose'),
  util = require('util'),
  Schema = mongoose.Schema;

function BuildingBaseSchema() {
  Schema.apply(this, arguments);

  this.add({
    name: String,
    type: {
      type: String, 
      enum: [
       'Raw Materials',
       'Manufactured Goods',
       'Military',
       'Civilian',
       'Scientific',
       'Commercial',
       'Guild'
      ]
    },
    builds: {
      type: Schema.ObjectId,
      ref: 'BuildingSchema',
    },
    built_by: {
      type: Schema.ObjectId,
      ref: 'BuildingSchema'
    },
    cost: Object,
    grants: Object
  });
}

util.inherits(BuildingBaseSchema, Schema);


var BuildingSchema = new BuildingBaseSchema();

module.exports = mongoose.model('Building', BuildingSchema);

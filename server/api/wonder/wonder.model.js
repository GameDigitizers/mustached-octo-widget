'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var WonderSchema = new Schema({
  name: String,
  resource: {
    type: Schema.ObjectId,
    ref: 'CardSchema',
  },
  stages: [Object]
});

module.exports = mongoose.model('Wonder', WonderSchema);
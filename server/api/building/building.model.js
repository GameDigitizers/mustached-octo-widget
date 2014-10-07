'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var BuildingSchema = new Schema({
  name: String,
  info: String,
  active: Boolean
});

module.exports = mongoose.model('Building', BuildingSchema);
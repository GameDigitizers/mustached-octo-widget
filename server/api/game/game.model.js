'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PlayerSchema = new Schema({

});

var GameSchema = new Schema({
  name: String,
  info: String,
  active: Boolean,
  players: Array
});

module.exports = mongoose.model('Game', GameSchema);
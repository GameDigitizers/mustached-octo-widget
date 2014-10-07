'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var GameSchema = new Schema({
  name: String,
  active: Boolean,
  players: {
    type: Schema.ObjectId,
    ref: 'PlayerSchema'
  }
});

// Validations
var Game = mongoose.model('Game', GameSchema);

Game.schema.path('name').validate(function (name) {
  return name.length > 0;
}, 'Game must have a name');

Game.schema.path('players').validate(function (users) {
  return users.length > 1 && users.length < 8;
}, 'Game must have at least one user');

module.exports = mongoose.model('Game', GameSchema);
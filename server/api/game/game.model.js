'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  Wonder = require('../wonder/wonder.model');

var assignWonder = function(wonders) {
  if (wonders.length > 0) {
    return wonders.splice(Math.floor(Math.random() * wonders.length) ,1)[0];
  }
}

var GameSchema = new Schema({
  name: String,
  active: Boolean,
  players: [{
    type: Schema.ObjectId,
    ref: 'PlayerSchema'
  }]
});

// Validations
var Game = mongoose.model('Game', GameSchema);

Game.schema.path('name').validate(function (name) {
  return name.length > 0;
}, 'Game must have a name');

Game.schema.path('players').validate(function (users) {
  return users.length > 1 && users.length < 8;
}, 'Game must have at least one user');

/**
 * Post hooks
 */
GameSchema.post('validate', function (game) {
  Wonder.find(function (err, wonders) {
    if(err) { return handleError(res, err); }
    
    game.players.forEach(function (player) {
      player.wonder = assignWonder(wonders);
      player.cash = 3;
    });
  });
  
});

module.exports = mongoose.model('Game', GameSchema);
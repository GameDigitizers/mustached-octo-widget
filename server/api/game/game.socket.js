/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Game = require('./game.model');
var Player = require('../player/player.model');
var User = require('../user/user.model');

exports.register = function(socket) {
  Game.schema.post('save', function (game) {
  	console.log('game is saved!');

    console.log("There are " + game.players.length + " players in this game");
    game.populate('players', function(err, players) {
      Player.populate(players, {path: 'players.user', model: 'User'}, function (err, game) {
        game.players.forEach(function (player) {
          console.log(player.user.name + " joinedness is " + player.joined);
        });
      });
    });

    onSave(socket, game);
  });
  Game.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
  Game.schema.post('join', function(complete) {
  	console.log('this worked!', complete);
  });
  Game.schema.post('host', function(complete) {
  	console.log('this worked!', complete);
  });
}

function onSave(socket, game, cb) {
  socket.emit('game:save', game);
}

function onRemove(socket, doc, cb) {
  socket.emit('game:remove', doc);
}
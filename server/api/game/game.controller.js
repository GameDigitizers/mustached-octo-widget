'use strict';

var _ = require('lodash');
var Game = require('./game.model');
var User = require('../user/user.model');
var Player = require('../player/player.model');

// Get list of games
exports.index = function(req, res) {
  Game.find(function (err, games) {
    if(err) { return handleError(res, err); }
    return res.json(200, games);
  });
};

// Get a single game
exports.show = function(req, res) {
  Game.findById(req.params.id, function (err, game) {
    if(err) { return handleError(res, err); }
    if(!game) { return res.send(404); }
    return res.json(game);
  });
};

// Creates a new game in the DB.
exports.create = function(req, res) {
  Game.create(req.body, function(err, game) {
    if(err) { return handleError(res, err); }
    return res.json(201, game);
  });
};

// Creates a new game in the DB.
exports.join = function(req, res) {
  // console.log(req.user);

  Game.find({'name': req.params.name}, function (err, game) {
    if(err) { return handleError(res, err); }
    if (game.length == 0) { 
      var players = [];
      var currUser = req.user;

      User.find({
        'email': { $in: req.body.players }
      }, '-salt -hashedPassword', function (err, users) {
        if(err) return res.send(500, err);

        users.forEach(function (user) {
          var joined = false;
          
          if (currUser.id == user.id) {
            console.log('joined!', user);
            joined = true;
          }

          players.push(
            new Player({
              user: user.id,
              joined: joined
            })
          );  
        });

        // console.log(players);

        new Game({
          name: req.params.name,
          active: false,
          players: players
        }).save();

        return res.json(201, game);
      });
    } else {
      // console.log(game[0].players[0]);
      // console.log(game);

      return res.json(200, game);
    }
  });
};

// Updates an existing game in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Game.findById(req.params.id, function (err, game) {
    if (err) { return handleError(res, err); }
    if(!game) { return res.send(404); }
    var updated = _.merge(game, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, game);
    });
  });
};

// Deletes a game from the DB.
exports.destroy = function(req, res) {
  Game.findById(req.params.id, function (err, game) {
    if(err) { return handleError(res, err); }
    if(!game) { return res.send(404); }
    game.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
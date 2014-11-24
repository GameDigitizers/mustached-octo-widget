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
// exports.create = function(req, res) {
//   console.log("********************************HELP***********************************************");
//   Game.create(req.body, function(err, game) {
//     if(err) { return handleError(res, err); }
//     return res.json(201, game);
//   });
// };

// Creates a new game in the DB.
exports.join = function(req, res) {
  // console.log(req.user);

  Game.find({'name': req.params.name}, function (err, games) {
    if(err) { return handleError(res, err); }
    if (games.length == 0) { 
      var game = new Game({
        name: req.params.name,
        active: false
      });

      game.host(req.user, req.body.players, function (err) {
        if(err) { return handleError(res, err); }

        game.save(function (err, game) {
          if(err) { return handleError(res, err); }
          return res.json(201, game);
        });
      });

    } else {
      games[0].join(req.user, req.params.name, function(err) {
        if(err) { return handleError(res, err); }
        return res.json(200, game);
      })
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
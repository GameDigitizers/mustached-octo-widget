'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  Wonder = require('../wonder/wonder.model'),
  Player = require('../player/player.model'),
  User = require('../user/user.model');

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

GameSchema.methods = {
  host: function (currUser, userEmails, cb) {
    var players = [];

    if (userEmails.indexOf(currUser.email) == -1) { 
      return cb("Host's email is not in list of players.");
    }

    User.find({
      'email': { $in: userEmails }
    }, '-salt -hashedPassword', function (err, users) {
      if(err) { return cb(err); }

      users.forEach(function (user) {
        var joined = false;
        
        if (currUser.id == user.id) {
          joined = true;
        }

        players.push(new Player({
          user: user.id,
          joined: joined
        }));
      });

      Player.create(players, function (err) {
        if(err) { return cb(err); }
        this.players = players;
        cb();
      }.bind(this));
    }.bind(this));
  }
};

// Validations
GameSchema.path('name').validate(function (name) {
  return name.length > 0;
}, 'Game must have a name');

GameSchema.path('players').validate(function (users) {
  return users.length > 1 && users.length < 8;
}, 'Game must have at least one player');

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


// KEEP THIS LAST!
module.exports = mongoose.model('Game', GameSchema);
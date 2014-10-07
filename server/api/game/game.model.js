'use strict';

var mongoose = require('mongoose'),
  util = require('util'),
  Schema = mongoose.Schema,
  UserSchema = require('../user/user.model.js'),
  BuildingSchema = require('../building/building.model.js')

// var BuildingSchema = new Schema({
//   name: String,
//   type: {
//     type: String, 
//     enum: [
//     'Raw Materials',
//     'Manufactured Goods',
//     'Military',
//     'Civilian',
//     'Scientific',
//     'Commercial',
//     'Guild'
//     ]
//   },
//   builds: {
//     type: Schema.ObjectId,
//     ref: 'BuildingSchema',
//   },
//   built_by: {
//     type: Schema.ObjectId,
//     ref: 'BuildingSchema'
//   },
//   cost: Object,
//   grants: Object
// });

var PlayerSchema = new Schema({
  user: {
    type: Schema.ObjectId,
    ref: 'UserSchema'
  },
  money: Number,
  military: {
    'wins': [Number],
    'loses': Number
  },
  hand: [{
    type: Schema.ObjectId,
    ref: 'BuildingSchema'
  }],
  wonder: {
    type: Schema.ObjectId,
    ref: 'WonderSchema'
  },
  buildings: [{
    type: Schema.ObjectId,
    ref: 'BuildingSchema'
  }]
});

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
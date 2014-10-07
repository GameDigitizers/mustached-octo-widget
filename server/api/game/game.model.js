'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    UserSchema = require('../user/user.model.js')

var BuildingSchema = new Schema({
    name: String,
    cost: {
        type: Schema.ObjectId,
        ref: 'ResourceSchema'
    },
    grants: [String]
});

var ResourceSchema = new Schema({
    name: String
});

var WonderSchema = new Schema({
    name: String,
    buildings: {
        type: Schema.ObjectId,
        ref: 'BuildingSchema'
    },
    resources: {
        type: Schema.ObjectId,
        ref: 'ResourceSchema'
    }
});

var CardSchema = new Schema({
    name: String,
    builds: {
        type: Schema.ObjectId,
        ref: 'CardSchema',
    },
    built_by: {
        type: Schema.ObjectId,
        ref: 'CardSchema'
    }
});

var PlayerSchema = new Schema({
    money: Number,
    cards: [{
        type: Schema.ObjectId,
        ref: 'CardSchema'
    }],
    wonder: {
        type: Schema.ObjectId,
        ref: 'WonderSchema'
    },
    user: {
        type: Schema.ObjectId,
        ref: 'UserSchema'
    }
});

var GameSchema = new Schema({
    name: String,
    active: Boolean,
    players: {
        type: Schema.ObjectId,
        ref: 'PlayerSchema'
    }
});

/**
 * Validations
 */

var Game = mongoose.model('Game', GameSchema);

Game.schema.path('name').validate(function (name) {
  return name.length > 0;
}, 'Game must have a name');

Game.schema.path('players').validate(function (users) {
  return users.length > 1 && users.length < 8;
}, 'Game must have at least one user');

module.exports = mongoose.model('Game', GameSchema);
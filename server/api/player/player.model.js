'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    UserSchema = require('../user/user.model.js'),
    BuildingSchema = require('../building/building.model.js')

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

module.exports = mongoose.model('Player', PlayerSchema);
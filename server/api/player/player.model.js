'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PlayerSchema = new Schema({
  user: {
    type: Schema.ObjectId,
    ref: 'UserSchema'
  },
  joined: {
    type: Boolean,
    default: false,
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
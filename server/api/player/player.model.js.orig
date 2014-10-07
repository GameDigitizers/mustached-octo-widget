'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PlayerSchema = new Schema({
<<<<<<< HEAD
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
=======
  name: String,
  info: String,
  active: Boolean
>>>>>>> 8ffd512de33c99781bee0612e40ad06a209066f9
});

module.exports = mongoose.model('Player', PlayerSchema);
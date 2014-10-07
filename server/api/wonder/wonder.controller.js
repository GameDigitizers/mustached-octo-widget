'use strict';

var _ = require('lodash');
var Wonder = require('./wonder.model');

// Get list of wonders
exports.index = function(req, res) {
  Wonder.find(function (err, wonders) {
    if(err) { return handleError(res, err); }
    return res.json(200, wonders);
  });
};

// Get a single wonder
exports.show = function(req, res) {
  Wonder.findById(req.params.id, function (err, wonder) {
    if(err) { return handleError(res, err); }
    if(!wonder) { return res.send(404); }
    return res.json(wonder);
  });
};

// Creates a new wonder in the DB.
exports.create = function(req, res) {
  Wonder.create(req.body, function(err, wonder) {
    if(err) { return handleError(res, err); }
    return res.json(201, wonder);
  });
};

// Updates an existing wonder in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Wonder.findById(req.params.id, function (err, wonder) {
    if (err) { return handleError(res, err); }
    if(!wonder) { return res.send(404); }
    var updated = _.merge(wonder, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, wonder);
    });
  });
};

// Deletes a wonder from the DB.
exports.destroy = function(req, res) {
  Wonder.findById(req.params.id, function (err, wonder) {
    if(err) { return handleError(res, err); }
    if(!wonder) { return res.send(404); }
    wonder.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
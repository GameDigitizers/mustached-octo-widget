'use strict';

var should = require('should'),
    app = require('../../app'),
    request = require('supertest'),
    mongoose = require('mongoose'),
    Game = mongoose.model('Game');

describe('GET /api/games', function() {

  it('should respond with JSON array', function(done) {
    request(app)
      .get('/api/games')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.should.be.instanceof(Array);
        done();
      });
  });
});

describe('POST /api/games/new/:name', function() {

  before(function (done) {
    console.log("Removing all games");
    Game.remove().exec();
    done();
  });

  it('should respond with a 201 with game if name does not exist yet', function(done) {
    request(app)
      .post('/api/games/new/octo-gamer')
      .expect(201)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.should.be.instanceof(Object);
        done();
      });
  });

  it ('should respond with a 200 if the game exists', function (done) {
    request(app)
      .post('/api/games/new/octo-gamer')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.should.be.instanceof(Object);
        done();
      });
  });
});
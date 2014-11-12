'use strict';

var should = require('should'),
    app = require('../../app'),
    request = require('supertest'),
    mongoose = require('mongoose'),
    Game = mongoose.model('Game'),
    User = mongoose.model('User'),
    login = require('../../helpers/loginHelper.spec'),
    superagent = require('superagent');
  
var agent = superagent.agent();


var game;
var nathan = new User({
    provider: 'local',
    name: 'Fake User',
    email: 'nathan@test.com',
    password: 'password'
});

var bert = new User({
    provider: 'local',
    name: 'Fake User',
    email: 'test@test.com',
    password: 'password'
});

var steve = new User({
    provider: 'local',
    name: 'Fake User',
    email: 'test@test.com',
    password: 'password'
});

describe('Game Model', function () {
  beforeEach(function () {
    game = new Game({
      name: 'septo-fluvial',
      active: true,
    });
  });

  it ('should not save without a name', function (done) {
    game.name = '';
    game.save(function (err) {
      should.exist(err);
      done()
    });
  });

  it ('should not save with less than 2 players', function (done) {
    game.players = [nathan.id];
    game.save(function (err) {
      should.exist(err);
      done()
    });
  });
});


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

    game = new Game({
      name: 'septo-fusilli',
      active: true,
      players: [nathan.id, bert.id, steve.id]
    });

    Game.remove().exec().then(function () {
      User.remove().exec().then(function() {
        nathan.save(function () {
          done();
        });
      });
    });
  });

  it ('should respond with a 201 with game if name does not exist yet', function(done) {
    login.login(request(app), function (loginAgent) {
      agent = loginAgent;
      var req = request(app).post('/api/games/new/octo-gamer');

      agent.attachCookies(req);

      console.log("AUTH TOKEN: " + login.auth_token);
      req
        .set("Authorization", login.auth_token)
        .expect(201)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          console.log(err);
          console.log(res);
          if (err) return done(err);
          res.body.should.be.instanceof(Object);

          done();
        });
    });
    
  });

  it.skip('should respond with a 200 if the game exists', function (done) {
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
'use strict';

var should = require('should'),
    app = require('../../app'),
    request = require('supertest'),
    mongoose = require('mongoose'),
    Game = mongoose.model('Game'),
    User = mongoose.model('User'),
    Player = require('../player/player.model'),
    login = require('../../helpers/loginHelper.spec');

var io = require('socket.io-client');

var socketURL = 'http://localhost:9000';

var options ={
  transports: ['websocket'],
  'force new connection': true
};

var game;

var nathan = new login.Agent(
  new User({
    provider: 'local',
    name: 'Nathan',
    email: 'nathan@test.com',
    password: 'password'
  })
);

var bert = new login.Agent(
  new User({
    provider: 'local',
    name: 'Bert',
    email: 'bert@test.com',
    password: 'password'
  })
);

var steve = new login.Agent(
  new User({
    provider: 'local',
    name: 'Steve',
    email: 'steve@test.com',
    password: 'password'
  })
);

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
    game.players = [nathan.model.id];
    game.save(function (err) {
      should.exist(err);
      done()
    });
  });
});

describe('Game Model host function' ,function () {
  beforeEach(function (done) {
    game = new Game({
      name: 'septo-fluvial',
      active: true,
    });

    Player.remove().exec().then(function () {
      User.create(
          [nathan.model,
          bert.model,
          steve.model],

          function() {
            done();
          }
      );
      
    });
  });

  it ('should err if host is not in user email list', function (done) {
    var client1 = io.connect(socketURL, {path: '/socket.io-client'});

    client1.on('connect', function(data) {
      client1.emit('connection name', 'chatUser1');
      console.log('?');

      /* Since first client is connected, we connect
      the second client. */
      var client2 = io.connect(socketURL, {path: '/socket.io-client'});

      client2.on('connect', function(data) {
        client2.emit('connection name', 'chatUser2');
        console.log('!');
      });
    });


    game.host(nathan.model, [bert.model.email, steve.model.email], function (err) {
      should.exist(err);
      done();
    });
  });

  it ('should save players to the database', function (done) {
    game.host(nathan.model, [nathan.model.email, bert.model.email, steve.model.email], function (err) {
      should.not.exist(err);

      Player.find({
        'user': { $in: [new mongoose.Types.ObjectId(nathan.model.id), new mongoose.Types.ObjectId(bert.model.id), new mongoose.Types.ObjectId(steve.model.id)] }
      }, function (err, users) {
        users.length.should.equal(3);
        done();
      });
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
    game = new Game({
      name: 'septo-fusilli',
      active: true,
      players: [nathan.model.id, bert.model.id, steve.model.id]
    });

    Game.remove().exec().then(function () {
      done();
    });
  });

  it ('should respond with a 201 with game if name does not exist yet', function(done) {
    nathan.login(request(app), function () {
      nathan
        .post(request(app), '/api/games/new/octo-gamer')
        .send({ players: [nathan.model.email, bert.model.email, steve.model.email] })
        .expect(201)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) return done(err);
          res.body.should.be.instanceof(Object);
          done();
        });
    });
  });

  it ('should respond with a 200 if the game exists', function (done) {
    bert.login(request(app), function() {
      bert
        .post(request(app), '/api/games/new/octo-gamer')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) return done(err);
          res.body.should.be.instanceof(Object);
          done();
        });
    });
  });

});
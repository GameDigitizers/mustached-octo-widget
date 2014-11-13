var superagent = require('superagent');
var agent = superagent.agent();
var mongoose = require('mongoose');
var User = mongoose.model('User');
var request = require('supertest');

function Agent(user) {
  superagent.agent.call(this);
  this.model = user;
  this.credentials = {
    email: user.email,
    password: user.password
  };
  this.auth_token = "";
}

Agent.prototype = Object.create(superagent.agent.prototype);

Agent.prototype.saveAuthToken = function(res) {
  if (res.body.token) {
    this.auth_token = 'Bearer ' + res.body.token;
  } else {
    throw ('No Authorization Token!');
  }
};

Agent.prototype.attachAuthToken = function(req) {
  req.set("Authorization", this.auth_token);
};

Agent.prototype.login = function (request, done) {
  request
    .post('/auth/local')
    .send(this.credentials)
    .expect(200)
    .end(function (err, res) {
      if (err) {
        throw err;
      }
      this.saveCookies(res);
      this.saveAuthToken(res);

      done();
    }.bind(this));
  };

Agent.prototype.post = function(request, url) {
  var req = request.post(url);

  this.attachCookies(req);
  this.attachAuthToken(req);

  return req;
};

exports.Agent = Agent;





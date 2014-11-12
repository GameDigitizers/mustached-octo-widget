var superagent = require('superagent');
var agent = superagent.agent();
var mongoose = require('mongoose');
var User = mongoose.model('User');

exports.nathan = new User({
    provider: 'local',
    name: 'Fake User',
    email: 'nathan@test.com',
    password: 'password'
});

exports.auth_token = "";

var theAccount = {
  email: "nathan@test.com",
  password: "password"
};

exports.login = function (request, done) {
  request
    .post('/auth/local')
    .send(theAccount)
    .expect(200)
    .end(function (err, res) {
      if (err) {
        throw err;
      }
      agent.saveCookies(res);

      console.log(res.body.token);
      exports.auth_token = 'Bearer ' + res.body.token;
      done(agent);
    });
};

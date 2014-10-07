/**
 * Main application routes
 */

'use strict';

var errors = require('./components/errors');

module.exports = function(app) {

  // Insert routes below
<<<<<<< HEAD
=======
  app.use('/api/wonders', require('./api/wonder'));
  app.use('/api/players', require('./api/player'));
  app.use('/api/buildings', require('./api/building'));
>>>>>>> 8ffd512de33c99781bee0612e40ad06a209066f9
  app.use('/api/games', require('./api/game'));
  app.use('/api/things', require('./api/thing'));
  app.use('/api/users', require('./api/user'));

  app.use('/auth', require('./auth'));
  
  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get(function(req, res) {
      res.sendfile(app.get('appPath') + '/index.html');
    });
};

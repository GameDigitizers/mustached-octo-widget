'use strict';

angular.module('7wondersApp')
  .controller('LobbyCtrl', function ($scope, Auth, Game) {
    $scope.message = 'Hello';

    $scope.joinGame = function () {
        console.log(Auth.getCurrentUser().name + " (" + Auth.getCurrentUser()._id + ") wants to join a game");

        var test = Game.joinGame({ name: 'septo-hills' }, {
          name: 'septo-hills',
          info: 'Works?',
    			active: true
        }, function(game) {
          return cb(game);
        }, function(err) {
          return cb(err);
        }).$promise;

        console.log(test);
    };
  });

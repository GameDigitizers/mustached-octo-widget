'use strict';

angular.module('7wondersApp')
  .controller('LobbyCtrl', function ($scope, Auth) {
    $scope.message = 'Hello';

    $scope.joinGame = function () {
        console.log(Auth.getCurrentUser().name + " (" + Auth.getCurrentUser()._id + ") wants to join a game");
    };
  });

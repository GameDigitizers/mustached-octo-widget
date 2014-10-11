'use strict';

angular.module('7wondersApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('lobby', {
        url: '/lobby',
        templateUrl: 'app/lobby/lobby.html',
        controller: 'LobbyCtrl',
        authenticate: true
      });
  });
  
'use strict';

angular.module('7wondersApp')
  .factory('Game', function ($resource) {
    return $resource('/api/games/:name', {
      name: '@name'
    },
    {
      joinGame: {
        method: 'POST',
        params: {
          name: '@name'
        },
        url: '/api/games/new/:name'
      }
    });
  });

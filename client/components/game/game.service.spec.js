'use strict';

describe('Service: game.service', function () {

  // load the service's module
  beforeEach(module('7wondersApp'));

  // instantiate service
  var game.service;
  beforeEach(inject(function (_game.service_) {
    game.service = _game.service_;
  }));

  it('should do something', function () {
    expect(!!game.service).toBe(true);
  });

});

'use strict';

describe('Controller: WeatherCtrl', function () {

  // load the controller's module
  beforeEach(module('wessApp'));

  var WeatherCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    WeatherCtrl = $controller('WeatherCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});

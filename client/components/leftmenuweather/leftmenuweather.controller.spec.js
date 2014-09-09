'use strict';

describe('Controller: LeftmenuweatherCtrl', function () {

  // load the controller's module
  beforeEach(module('wessApp'));

  var LeftmenuweatherCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    LeftmenuweatherCtrl = $controller('LeftmenuweatherCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});

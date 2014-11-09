'use strict';

describe('Controller: TailfingenCtrl', function () {

  // load the controller's module
  beforeEach(module('wessApp'));

  var TailfingenCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TailfingenCtrl = $controller('TailfingenCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});

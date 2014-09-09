'use strict';

describe('Controller: EntringenCtrl', function () {

  // load the controller's module
  beforeEach(module('wessApp'));

  var EntringenCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    EntringenCtrl = $controller('EntringenCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});

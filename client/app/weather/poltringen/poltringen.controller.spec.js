'use strict';

describe('Controller: PoltringenCtrl', function () {

  // load the controller's module
  beforeEach(module('wessApp'));

  var PoltringenCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PoltringenCtrl = $controller('PoltringenCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});

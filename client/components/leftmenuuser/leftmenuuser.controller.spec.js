'use strict';

describe('Controller: LeftmenuuserCtrl', function () {

  // load the controller's module
  beforeEach(module('wessApp'));

  var LeftmenuuserCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    LeftmenuuserCtrl = $controller('LeftmenuuserCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});

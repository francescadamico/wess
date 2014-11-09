'use strict';

describe('Controller: UserDataCtrl', function () {

  // load the controller's module
  beforeEach(module('wessApp'));

  var UserDataCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    UserDataCtrl = $controller('UserDataCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});

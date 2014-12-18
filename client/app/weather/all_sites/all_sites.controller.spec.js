'use strict';

describe('Controller: AllSitesCtrl', function () {

  // load the controller's module
  beforeEach(module('wessApp'));

  var AllSitesCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AllSitesCtrl = $controller('AllSitesCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});

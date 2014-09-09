'use strict';

describe('Controller: WikipageCtrl', function () {

  // load the controller's module
  beforeEach(module('wessApp'));

  var WikipageCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    WikipageCtrl = $controller('WikipageCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});

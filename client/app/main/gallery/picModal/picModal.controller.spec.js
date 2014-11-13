'use strict';

describe('Controller: PicmodalCtrl', function () {

  // load the controller's module
  beforeEach(module('wessApp'));

  var PicmodalCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PicmodalCtrl = $controller('PicmodalCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});

'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('wessApp'));

  var MainCtrl,
    scope,
    $httpBackend;

  // Initialize the controller and a mock scope
  beforeEach(inject(function (_$httpBackend_, $controller, $rootScope) {
    $httpBackend = _$httpBackend_;
    $httpBackend.expectGET('/api/awesomeThings')
      .respond(['HTML5 Boilerplate', 'AngularJS', 'Karma', 'Express']);
    $httpBackend.expectGET('/api/dataCount')
      .respond({ count: '42' });
    scope = $rootScope.$new();
    MainCtrl = $controller('MainCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings and a count of records to the scope', function () {
    expect(scope.awesomeThings).toBeUndefined();
    expect(scope.count).toBeUndefined();
    $httpBackend.flush();
    expect(scope.awesomeThings.length).toBe(4);
    expect(scope.count).toBe('42');
  });
});

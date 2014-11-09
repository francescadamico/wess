'use strict';

angular.module('wessApp')
  .controller('MainCtrl', function ($scope, $http) {
    $scope.count;
    $scope.isCountCallSuccessful;

    $http.get('/api/data').success(function(result) {
      $scope.count = result.count;
      $scope.isCountCallSuccessful = true;
    }).error(function(data, status, headers, config) {
      $scope.isCountCallSuccessful = false;
      console.log(data);
    });
  });
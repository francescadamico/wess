'use strict';

angular.module('wessApp')
  .controller('MainCtrl', function ($scope, $http) {
    $scope.awesomeThings = [];
    $scope.count;
    $scope.isCountCallSuccessful;

    $http.get('/api/things').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
    });

    $http.get('/api/dataCount').success(function(result) {
      $scope.count = result.count;
      $scope.isCountCallSuccessful = true;
    }).error(function(data, status, headers, config) {
      $scope.isCountCallSuccessful = false;
      console.log(data);
    });
  });
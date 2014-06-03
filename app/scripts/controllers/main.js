'use strict';

angular.module('wessApp')
  .controller('MainCtrl', function ($scope, $http) {
    $http.get('/api/awesomeThings').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
    });

    $http.get('/api/dataCount').success(function(result) {
      $scope.count = result.count;
    });
  });

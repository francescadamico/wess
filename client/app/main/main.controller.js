'use strict';

angular.module('wessApp')
  .controller('MainCtrl', function ($scope, $http) {
      /* $scope.firstCall controls the part of the html that has to be loaded:
       *    when $scope.firstCall == true, the pageStructure is called loading 
       *    the navigation bar and the left menu. After that pageStructures sets
       *    $scope.firstCall = "false" and the content is displayed (see html)
       */
      $scope.firstCall = "true";
      
      /*$scope.count;
      $scope.isCountCallSuccessful;

      $http.get('/api/dataCount').success(function(result) {
          $scope.count = result.count;
          $scope.isCountCallSuccessful = true;
      }).error(function(data, status, headers, config) {
          $scope.isCountCallSuccessful = false;
          console.log(data);
      });*/
  });
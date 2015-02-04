'use strict';

angular.module('wessApp')
  .controller('UserDataCtrl', function ($scope) {
      /* $scope.firstCall controls the part of the html that has to be loaded:
       *    when $scope.firstCall == true, the pageStructure is called loading 
       *    the navigation bar and the left menu. After that pageStructures sets
       *    $scope.firstCall = "false" and the content is displayed (see html)
       */
      $scope.firstCall = "true";
  });

'use strict';

angular.module('wessApp')
  .controller('PagestructureCtrl', function ($scope, $location) {
      
      /* $location.path() returns only the central path of the complete path,
       * so "app/" at the beginning and "/file.html" at the end should be added:
       */
      
      var path;
      var splitPath = $location.path().split("/");
      
      if (splitPath[1] === ""){
          /* if the path is empty, then it is the home page,
           * located in "app/main/main.html" 
           */
          path = "app/main/main.html";
      }
      else {
          path = ("app"+$location.path()+"/"+splitPath[splitPath.length-1]+".html");
      }
      
      $scope.loadContent = function(){
          // this scope is the scope of the parent that is calling pageStructure.html
          $scope.firstCall = "false";
          return path;
      };
      
  });
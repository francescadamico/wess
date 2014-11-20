'use strict';

angular.module('wessApp')
  .controller('PicmodalCtrl', function ($scope, pictures, picIdx) {
    // this is passed by the "resolve:" in about.controller.js to be used by the html
      $scope.pictures = pictures;
      
      $scope.picIdx = picIdx;
      
      // WARNING: handle the cases -probably it is better to handle them in the gallery.controller-:
      // picIdx > max PicIdx;
      // picIdx < min PicIdx
      $scope.next = function(){
         // if condition to avoid non existing picIdx
          if ($scope.picIdx < $scope.pictures.length -1) {
              return $scope.picIdx = $scope.picIdx+1;
          }
          else {
              return $scope.picIdx = 0;
          }
      };
      
      $scope.prev = function(){
          if ($scope.picIdx > 0) {
              return $scope.picIdx = $scope.picIdx-1;
          }
          else {
              return $scope.picIdx = $scope.pictures.length -1;
          }
      };
  });

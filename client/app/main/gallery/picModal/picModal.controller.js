'use strict';

angular.module('wessApp')
  .controller('PicmodalCtrl', function ($scope, mainImageUrl) {
    $scope.mainImageUrl = mainImageUrl;
  });

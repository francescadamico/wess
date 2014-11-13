'use strict';

angular.module('wessApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/picModal', {
        templateUrl: 'app/main/gallery/picModal/picModal.html',
        controller: 'PicmodalCtrl'
      });
  });

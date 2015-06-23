'use strict';

angular.module('wessApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/amnet/weather/entringen', {
        templateUrl: 'app/weather/entringen/entringen.html',
        controller: 'EntringenCtrl'
      });
  });

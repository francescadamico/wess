'use strict';

angular.module('wessApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/amnet/weather/poltringen', {
        templateUrl: 'app/weather/poltringen/poltringen.html',
        controller: 'PoltringenCtrl'
      });
  });

'use strict';

angular.module('wessApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/weather/tailfingen', {
        templateUrl: 'app/weather/tailfingen/tailfingen.html',
        controller: 'TailfingenCtrl'
      });
  });

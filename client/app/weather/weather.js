'use strict';

angular.module('wessApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/amnet/weather', {
        templateUrl: 'app/weather/weather.html',
        controller: 'WeatherCtrl'
      });
  });

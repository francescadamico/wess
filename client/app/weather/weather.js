'use strict';

angular.module('wessApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/weather', {
        templateUrl: 'app/weather/weather.html',
        controller: 'WeatherCtrl'
      });
  });

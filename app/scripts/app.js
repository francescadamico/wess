'use strict';

angular.module('wessApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute'
])
  .config(function ($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'partials/main',
        controller: 'MainCtrl'
      })
      .when('/aboutus', {
        templateUrl: 'partials/aboutus'
      })
      .when('/weather', {
        templateUrl: 'partials/weather',
        controller: 'WeatherCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
      
    $locationProvider.html5Mode(true);
  });
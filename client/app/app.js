'use strict';

angular.module('wessApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'ui.bootstrap',
  'n3-line-chart'
])
  .config(function ($routeProvider, $locationProvider) {
    $routeProvider
      .otherwise({
        redirectTo: '/amnet'
      });

    $locationProvider.html5Mode(true);
  });
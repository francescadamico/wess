'use strict';

angular.module('wessApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/amnet/', {
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl'
      });
  });
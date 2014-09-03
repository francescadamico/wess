'use strict';

angular.module('wessApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/data', {
        templateUrl: 'app/data/data.html',
        controller: 'DataCtrl'
      });
  });

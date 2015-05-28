'use strict';

angular.module('wessApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/data/data', {
        templateUrl: 'app/user_data/data/data.html',
        controller: 'DataCtrl'
      });
  });

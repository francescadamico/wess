'use strict';

angular.module('wessApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/amnet/user_data/data', {
        templateUrl: 'app/user_data/data/data.html',
        controller: 'DataCtrl'
      });
  });

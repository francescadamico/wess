'use strict';

angular.module('wessApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/amnet/user_data', {
        templateUrl: 'app/user_data/user_data.html',
        controller: 'UserDataCtrl'
      });
  });

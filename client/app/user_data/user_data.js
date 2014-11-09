'use strict';

angular.module('wessApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/user_data', {
        templateUrl: 'app/user_data/user_data.html',
        controller: 'UserDataCtrl'
      });
  });

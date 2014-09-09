'use strict';

angular.module('wessApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/goals', {
        templateUrl: 'app/main/goals/goals.html',
        controller: 'GoalsCtrl'
      });
  });

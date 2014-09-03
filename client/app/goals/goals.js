'use strict';

angular.module('wessApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/goals', {
        templateUrl: 'app/goals/goals.html',
        controller: 'GoalsCtrl'
      });
  });

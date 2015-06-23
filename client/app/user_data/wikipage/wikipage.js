'use strict';

angular.module('wessApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/amnet/user_data/wikipage', {
        templateUrl: 'app/user_data/wikipage/wikipage.html',
        controller: 'WikipageCtrl'
      });
  });

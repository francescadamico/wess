'use strict';

angular.module('wessApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/user_data/wikipage', {
        templateUrl: 'app/user_data/wikipage/wikipage.html',
        controller: 'WikipageCtrl',
        authenticate: true
      });
  });

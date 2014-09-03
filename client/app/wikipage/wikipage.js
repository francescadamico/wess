'use strict';

angular.module('wessApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/wikipage', {
        templateUrl: 'app/wikipage/wikipage.html',
        controller: 'WikipageCtrl'
      });
  });

'use strict';

angular.module('wessApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/sites', {
        templateUrl: 'app/main/sites/sites.html',
        controller: 'SitesCtrl'
      });
  });

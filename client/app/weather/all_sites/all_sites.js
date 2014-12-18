'use strict';

angular.module('wessApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/weather/all_sites', {
        templateUrl: 'app/weather/all_sites/all_sites.html',
        controller: 'AllSitesCtrl'
      });
  });

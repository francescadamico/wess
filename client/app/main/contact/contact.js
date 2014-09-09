'use strict';

angular.module('wessApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/contact', {
        templateUrl: 'app/main/contact/contact.html',
        controller: 'ContactCtrl'
      });
  });

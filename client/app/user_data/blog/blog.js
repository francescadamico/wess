'use strict';

angular.module('wessApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/data/blog', {
        templateUrl: 'app/user_data/blog/blog.html',
        controller: 'BlogCtrl'
      });
  });

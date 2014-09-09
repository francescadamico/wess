'use strict';

angular.module('wessApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/user_data/blog', {
        templateUrl: 'app/user_data/blog/blog.html',
        controller: 'BlogCtrl'
      });
  });

'use strict';

angular.module('wessApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/post', {
        templateUrl: 'app/post/post.html',
        controller: 'PostCtrl'
      });
  });

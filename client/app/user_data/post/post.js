'use strict';

angular.module('wessApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/amnet/user_data/post', {
        templateUrl: 'app/user_data/post/post.html',
        controller: 'PostCtrl'
      });
  });

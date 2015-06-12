'use strict';

angular.module('wessApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/data/post', {
        templateUrl: 'app/user_data/post/post.html',
        controller: 'PostCtrl'
      });
  });

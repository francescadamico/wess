'use strict';

angular.module('wessApp')
  .controller('LeftmenuuserCtrl', function ($scope, $location) {
    $scope.leftmenu = [
        {
            'title': 'Blog',
            'link': '/blog'
        },
        {
            'title': 'Post',
            'link': '/post'
        },
        {
            'title': 'Data',
            'link': '/data'
        },
        {
            'title': 'Wiki page',
            'link': '/wikipage'
        }
    ];
      
    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });
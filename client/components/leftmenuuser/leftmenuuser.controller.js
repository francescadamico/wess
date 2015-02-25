'use strict';

angular.module('wessApp')
  .controller('LeftmenuuserCtrl', function ($scope, $location) {
    $scope.leftmenuuser = [
        {
            'title': 'Blog',
            'link': '/user_data'///blog'
        },
        {
            'title': 'Post',
            'link': '/user_data'///post'
        },
        {
            'title': 'Data',
            'link': '/user_data'///data'
        },
        {
            'title': 'Wiki page',
            'link': '/user_data'///wikipage'
        }
    ];
      
    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });

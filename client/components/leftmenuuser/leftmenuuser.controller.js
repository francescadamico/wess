'use strict';

angular.module('wessApp')
  .controller('LeftmenuuserCtrl', function ($scope, $location) {
    $scope.leftmenuuser = [
        /*{
            'title': 'Blog',
            'link': '/amnet/user_data'///blog'
        },
        {
            'title': 'Post',
            'link': '/amnet/user_data'///post'
        },
        {
            'title': 'Data',
            'link': '/amnet/user_data'///data'
        },
        {
            'title': 'Wiki page',
            'link': '/amnet/user_data'///wikipage'
        }*/
    ];
      
    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });

'use strict';

angular.module('wessApp')
  .controller('LeftmenuCtrl', function ($scope, $location) {
    $scope.leftmenu = [
        {
            'title': 'Sites',
            'link': '/amnet/main/sites'
        },
        {
            'title': 'Research',
            'link': '/amnet/main/goals'
        },
        {
            'title': 'Gallery',
            'link': '/amnet/main/gallery'
        },
        {
            'title': 'Contact',
            'link': '/amnet/main/contact'
        }
    ];
      
    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });
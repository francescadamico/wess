'use strict';

angular.module('wessApp')
  .controller('LeftmenuCtrl', function ($scope, $location) {
    $scope.leftmenu = [
        {
            'title': 'Sites',
            'link': '/sites'
        },
        {
            'title': 'Goals',
            'link': '/goals'
        },
        {
            'title': 'Gallery',
            'link': '/gallery'
        },
        {
            'title': 'Contact',
            'link': '/contact'
        }
    ];
      
    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });
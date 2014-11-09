'use strict';

angular.module('wessApp')
  .controller('LeftmenuCtrl', function ($scope, $location) {
    $scope.leftmenu = [
        {
            'title': 'Sites',
            'link': '/main/sites'
        },
        {
            'title': 'Goals',
            'link': '/main/goals'
        },
        {
            'title': 'Gallery',
            'link': '/main/gallery'
        },
        {
            'title': 'Contact',
            'link': '/main/contact'
        }
    ];
      
    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });
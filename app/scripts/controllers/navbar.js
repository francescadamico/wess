'use strict';

angular.module('wessApp')
  .controller('NavbarCtrl', function ($scope, $location) {
    $scope.menu = [
      {
        'title': 'Home',
        'link': '/'
      },
      {
        'title': 'About Us',
        'link': '/aboutus'
      }
    ];
    
    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });

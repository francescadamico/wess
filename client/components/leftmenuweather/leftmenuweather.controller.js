'use strict';

angular.module('wessApp')
  .controller('LeftmenuweatherCtrl', function ($scope, $location) {
    $scope.leftmenuweather = [
      {
        'title': 'All sites',
        'link': '/weather/all_sites'
      },
      {
        'title': 'Entringen',
        'link': '/weather/entringen'
      },
      {
        'title': 'Poltringen',
        'link': '/weather/poltringen'
      },
      {
        'title': 'Tailfingen',
        'link': '/weather/tailfingen'
      }
    ];

    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });


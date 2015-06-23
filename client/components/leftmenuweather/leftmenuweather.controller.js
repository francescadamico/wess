'use strict';

angular.module('wessApp')
  .controller('LeftmenuweatherCtrl', function ($scope, $location) {
    $scope.leftmenuweather = [
      {
        'title': 'All sites',
        'link': '/amnet/weather/all_sites'
      },
      {
        'title': 'Entringen',
        'link': '/amnet/weather/entringen'
      },
      {
        'title': 'Poltringen',
        'link': '/amnet/weather/poltringen'
      },
      {
        'title': 'Tailfingen',
        'link': '/amnet/weather/tailfingen'
      }
    ];

    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });


'use strict';

angular.module('wessApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/leftmenuweather', {
        templateUrl: 'components/leftmenuweather/leftmenuweather.html',
        controller: 'LeftmenuweatherCtrl'
      });
  });

'use strict';

angular.module('wessApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/gallery', {
        templateUrl: 'app/main/gallery/gallery.html',
        controller: 'GalleryCtrl'
      });
  });

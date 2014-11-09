'use strict';

angular.module('wessApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/main/gallery', { //the /main/ url part is added because it is necessary for the isActive function called by navbar.controller.js 
        templateUrl: 'app/main/gallery/gallery.html',
        controller: 'GalleryCtrl'
      });
  });

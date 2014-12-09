'use strict';

angular.module('wessApp')
  .controller('PoltringenCtrl', function ($scope, $http) {
    $scope.day = new Date(Date.UTC(2014, 2, 10, 0, 0, 0)); //it creates a UTC date to be given to the server for the query
      $scope.monthNames = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
      
      $scope.station = 3;
      $scope.plots = [
      {
          measurement_name:'Atmospheric Temperature',
          senstypedescr:'temperature',
          measdescr:'avg',
          sensheight1: 185,
          sensheight2: 284
      },
      {
          measurement_name:'Atmospheric Humidity',
          senstypedescr:'moisture',
          measdescr:'avg',
          sensheight1: 185,
          sensheight2: 284
      },
      {
          measurement_name:'Wind Speed',
          senstypedescr:'wind speed',
          measdescr:'avg',
          sensheight1: 185,
          sensheight2: 284
      },
      {
          measurement_name:'Incoming Short-Wave Radiation',
          senstypedescr:'pyranometer up',
          measdescr:'avg',
          sensheight1: 150,
          sensheight2: 150
      },
      {
          measurement_name:'Soil Temperature',
          senstypedescr:'soil temperature',
          measdescr:'sample',
          sensheight1: 10,
          sensheight2: 10
      }
    ];

  });
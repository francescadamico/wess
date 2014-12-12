'use strict';

angular.module('wessApp')
  .controller('EntringenCtrl', function ($scope, $http) {
      $scope.day = new Date(Date.UTC(2014, 2, 10, 0, 0, 0)); //it creates a UTC date to be given to the server for the query
      $scope.monthNames = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
      
      $scope.station = 1;
      $scope.plots = [
      {
          measurement_name:'Atmospheric Temperature',
          //senstypedescr:'temperature',
          senstypeid: 7,
          measdescr:'avg',
          sensheight1: 187,
          sensheight2: 287
      },
      {
          measurement_name:'Atmospheric Humidity',
          //senstypedescr:'moisture',
          senstypeid: 6,
          measdescr:'avg',
          sensheight1: 187,
          sensheight2: 287
      },
      {
          measurement_name:'Wind Speed',
          //senstypedescr:'wind speed',
          senstypeid: 4,
          measdescr:'avg',
          sensheight1: 187,
          sensheight2: 287
      },
      {
          measurement_name:'Incoming Short-Wave Radiation',
          //senstypedescr:'pyranometer up',
          senstypeid: 10,
          measdescr:'avg',
          sensheight1: 150,
          sensheight2: 150
      },
      {
          measurement_name:'Soil Temperature',
          //senstypedescr:'soil temperature',
          senstypeid: 3,
          measdescr:'sample',
          sensheight1: 10,
          sensheight2: 10
      }
    ];

  });


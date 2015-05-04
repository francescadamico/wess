'use strict';

angular.module('wessApp')
  .controller('PoltringenCtrl', function ($scope, $http) {
    $scope.day = new Date();
    var date = $scope.day.getDate()-20; 
    $scope.day.setDate(date);
      //$scope.day = new Date(Date.UTC(2015, 1, 21, 12, 0, 0)); //it creates a UTC date to be given to the server for the query, data start at midday
      $scope.monthNames = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
      
      $scope.timeInterval = 'One day';
      $scope.site = 'Poltringen';
      $scope.plots = [
          {
              measurement_name:'Atmospheric Temperature',
              channel: 'AirTemp__',
              statistic: 'Avg'
          },
          {
              measurement_name:'Atmospheric Humidity',
              channel: 'RH__',
              statistic: 'Avg'
          },
          {
              measurement_name:'Wind Speed',
              channel:'WindSpd__',
              statistic: 'Avg'
          },
          {
              measurement_name:'Incoming Short-Wave Radiation',
              channel: 'SR01Up',
              statistic: 'Avg'
          },
          {
              measurement_name:'Cumulative Rain',
              channel: 'Rain_mm',
              statistic: 'Tot'
          },
          {
              measurement_name:'Soil Temperature',
              channel: 'SoilTemp__',
              statistic: 'Avg'
          }
      ];
      
       // listener to the "timeSelector" message 
      $scope.$on("timeSelector", function(eventContext, timeInterval){
          $scope.timeInterval = timeInterval;
          // React to the event.
      });

  });
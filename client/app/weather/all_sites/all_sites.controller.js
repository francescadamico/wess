'use strict';

angular.module('wessApp')
  .controller('AllSitesCtrl', function ($scope) {
      
    $scope.day = new Date();
    var date = $scope.day.getDate()-1; 
    $scope.day.setDate(date);
      //$scope.day = new Date(Date.UTC(2015, 1, 21, 12, 0, 0)); //it creates a UTC date to be given to the server for the query, data start at midday
      $scope.station = 'all';
      $scope.monthNames = [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ];
      
      $scope.plots = [
      {
          measurement_name: 'Atmospheric Temperature',
          channel: 'AirTemp__',
          statistic: 'Avg'
      },
      {
          measurement_name:'Cumulative Rain',
          channel: 'Rain_mm',
          statistic: 'Tot'
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
      }
    ];
      

      // listener to the "timeSelector" message 
      $scope.$on('timeSelector', function(eventContext, timeInterval){
          $scope.timeInterval = timeInterval;
          // React to the event.
      });
      
  });

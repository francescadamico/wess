'use strict';

angular.module('wessApp')
  .controller('PoltringenCtrl', function ($scope, $http) {
    
    $scope.station = 'polt';
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
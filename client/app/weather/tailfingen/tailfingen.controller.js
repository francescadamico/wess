'use strict';

angular.module('wessApp')
  .controller('TailfingenCtrl', function ($http, $scope) {
      
    $scope.timeInterval = 'One day';
    $scope.station = 'tail';
    $scope.plots = [
        {
            measurement_name:'Atmospheric Temperature (°C)',
            channel: 'AirTemp__',
            statistic: 'Avg'
        },
        {
            measurement_name:'Atmospheric Humidity (%)',
            channel: 'RH__',
            statistic: 'Avg'
        },
        {
            measurement_name:'Wind Speed (m/s)',
            channel:'WindSpd__',
            statistic: 'Avg'
        },
        {
            // \u00B2 corresponds to ^2
            measurement_name:'Incoming Short-Wave Radiation (W/m\u00B2)',
            channel: 'SR01Up',
            statistic: 'Avg'
        },
        {
            measurement_name:'Cumulative Rain (L/m\u00B2)',
            channel: 'Rain_mm',
            statistic: 'Tot'
        },
        {
            measurement_name:'Soil Temperature (°C)',
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
'use strict';

angular.module('wessApp')
  .controller('AllSitesCtrl', function ($scope, $http) {
    
    $scope.station = 'all';
    $scope.plots = [
    {
        measurement_name: 'Atmospheric Temperature (°C)',
        channel: 'AirTemp__',
        statistic: 'Avg'
    },
    {
        // \u00B2 corresponds to ^2
        measurement_name:'Cumulative Rain (L/m\u00B2)',
        channel: 'Rain_mm',
        statistic: 'Tot'
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
    }
    ];

    // listener to the "timeSelector" message 
    $scope.$on("timeSelector", function(eventContext, timeInterval){
        $scope.timeInterval = timeInterval;
        // React to the event.
    });

});

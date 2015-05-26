'use strict';

angular.module('wessApp')
  .controller('AllSitesCtrl', function ($scope, $http) {
    
    $scope.station = 'all';
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
    $scope.$on("timeSelector", function(eventContext, timeInterval){
        $scope.timeInterval = timeInterval;
        // React to the event.
    });

});

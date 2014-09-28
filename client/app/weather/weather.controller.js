'use strict';

angular.module('wessApp')
  .controller('WeatherCtrl', function ($scope, $http) {
  
    $scope.data;
    $scope.isAPICallSuccessful;
    $scope.sensorid = 197;
    $scope.day = '2014-03-21';
    
    $scope.options = {
      axes: {
        x: {key: 'tick', type: 'date'},
        y: {type: 'linear', min: -70, max: -50}
      },
      series: [
        {y: 'value', color: 'steelblue', thickness: '2px', striped: true, label: 'Our data'}
      ],
      tooltip: {
        mode: "scrubber",
        formatter: function (x, y, series) {
          return moment(x).format("MMMM Do YYYY, h:mm:ss a") + ' : ' + y;
        }
      },
      lineMode: 'linear',
      tension: 0.7,
      drawLegend: true,
      drawDots: true
    };
    
    $http.get('/api/data/hourlyAvgForDay', {params: {sensorid: $scope.sensorid, day: $scope.day}})
    .success(function(result) {  
      for (var i = 0; i < result.length; i++) {
        result[i].tick = new Date(result[i].tick).getTime(); 
      }
      console.log(JSON.stringify(result));
      $scope.data = result;
      $scope.isAPICallSuccessful = true;})
    .error(function(data, status, headers,config) {
      $scope.isAPICallSuccessful = false;
      console.log(data);
    });
  });

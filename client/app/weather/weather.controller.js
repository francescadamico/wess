'use strict';

angular.module('wessApp')
  .controller('WeatherCtrl', function ($scope, $http) {
  
    $scope.data;
    $scope.isAPICallSuccessful;
    $scope.resultIsEmpty;
  
      var station = [3,1,2];
      var height = 250;
      var sensortype = 7;
      var measuredescr = 'avg';//41;
      var sensorid = [210,232];
      var descriptionid = 41;
      var senstypedescr = 'temperature'; 
    var day = new Date(Date.UTC(2013, 9, 9)); //it creates a UTC date to be given to the server for the query
    
    $scope.options = {
      axes: {
        x: {key: 'tick', type: 'date'},
        y: {type: 'linear'}
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
    
    $http.get('/api/data/hourlyAvgForDay', {params: {day: day, station: station[0], height: height, senstypedescr:senstypedescr, measuredescr:measuredescr}}) 
    .success(function(result) {      
      //to check whether the query result is empty or not 
      if (result.length === 0){
        $scope.resultIsEmpty = true;
        $scope.isAPICallSuccessful = true;
      }
      else {
        $scope.data = result.map(function(datum) {
          return {
            value: Number(datum.value),
            tick: Date.parse(datum.tick)
          };
        });
        $scope.resultIsEmpty = false;
        $scope.isAPICallSuccessful = true;
      }
    })
    .error(function(data, status, headers,config) {
      $scope.isAPICallSuccessful = false;
      console.log(data);
    });
  });

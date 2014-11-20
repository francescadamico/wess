'use strict';

angular.module('wessApp')
  .controller('WeatherCtrl', function ($scope, $http) {
  
    $scope.data;
    $scope.isAPICallSuccessful;
    $scope.resultIsEmpty;
  
      var station = [3,1,2];
      var height = 250;
      var measuredescr = 'avg';
      var senstypedescr = 'temperature'; 
      $scope.day = new Date(Date.UTC(2013, 9, 10)); //it creates a UTC date to be given to the server for the query
      
      $scope.monthNames = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
    
    $scope.options = {
      axes: {
        x: {key: 'tick', type: 'date'},
        y: {type: 'linear'}
      },
      series: [
          {y: 'value1', color: 'steelblue', thickness: '2px', striped: true, label: 'Poltringen'},
          {y: 'value2', color: 'red', thickness: '2px', striped: true, label: 'Tailfingen'},
          {y: 'value3', color: 'green', thickness: '2px', striped: true, label: 'Entringen'}
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
    
    $http.get('/api/data/hourlyAvgForDay3Sites', {params: {day: $scope.day, height: height, senstypedescr:senstypedescr, measuredescr:measuredescr}}) 
    .success(function(result) {      
      //to check whether the query result is empty or not 
      if (result.length === 0){
        $scope.resultIsEmpty = true;
        $scope.isAPICallSuccessful = true;
      }
      else {
        $scope.data = result.map(function(datum) {
          return {
            value1: Number(datum.value1),
            value2: Number(datum.value2),
            value3: Number(datum.value3),
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

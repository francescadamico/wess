'use strict';

angular.module('wessApp')
  .controller('WeatherCtrl', function ($scope, $http) {
  
    $scope.data;
    $scope.isAPICallSuccessful;
  
    var sensorid = 210;
    var day = new Date(Date.UTC(2013, 9, 9, 0, 0, 0)); //it creates a UTC date to be given to the server for the query
    
    $scope.options = {
      axes: {
        x: {key: 'tick', type: 'date'},
        y: {type: 'linear'}//, min: -70, max: -50}
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
    
    $http.get('/api/data/hourlyAvgForDay', {params: {sensorid: sensorid, day: day }}) 
    .success(function(result) {
        
        //to check whether the query result is empty or not 
        if (result.length === 0){
            console.log ('the result of the query is empty');
        }
        else {
            for (var i = 0; i < result.length; i++) {
                result[i].tick = new Date(result[i].tick).getTime(); 
            }
      
            console.log(JSON.stringify(result));
      
            $scope.data = result;
            $scope.isAPICallSuccessful = true;
        }
    })
    .error(function(data, status, headers,config) {
      $scope.isAPICallSuccessful = false;
      console.log(data);
    });
  });

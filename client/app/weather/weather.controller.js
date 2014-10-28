'use strict';

angular.module('wessApp')
  .controller('WeatherCtrl', function ($scope, $http) {
  
    $scope.data;
    $scope.isAPICallSuccessful;
  
    var station = [3,1,2];
      var height = 250;
      var sensortype = 7;
      var measuredescr = 41;  

    $scope.showDay = new Date(Date.UTC(2014, 3, 10, 0, 0, 0)); //it creates a UTC date to be given to the server for the query
    
      var day = $scope.showDay;
    $scope.options = {
      axes: {
        x: {key: 'tick', type: 'date'},
        y: {type: 'linear', min: 0, max: 20}
      },
      series: [
        {y: 'value1', color: 'steelblue', thickness: '2px', striped: true, label: 'Entringen'},
          {y: 'value2', color: 'red', thickness: '2px', striped: true, label: 'Poltringen'},
          {y: 'value3', color: 'green', thickness: '2px', striped: true, label: 'Tailfingen'}
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
    
      $http.get('/api/data/hourlyAvgForDay3Sites', {params: {day: day, station: station, height: height, sensortype:sensortype, measuredescr:measuredescr}})
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

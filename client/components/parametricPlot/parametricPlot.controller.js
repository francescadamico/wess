'use strict';

angular.module('wessApp')
  .controller('ParametricplotCtrl', function ($scope, $http) {
      $scope.data;
      $scope.count;
      $scope.isAPICallSuccessful;
      
      $scope.loadPlot = function(day,station,senstypeid,measdescr,sensheight1,sensheight2){ 
          
          $scope.options = {
              axes: {
                  x: {key: 'tick', type: 'date'},
                  y: {type: 'linear'}//, min: 0, max: 20}
              },
              series: [
                  {y: 'value', color: 'steelblue', thickness: '2px', striped: true}
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
          
          $http.get('/api/data/hourlyAvgForDayParametric', {params: {day: day, station: station, senstypeid:senstypeid, measdescr:measdescr, sensheight1:sensheight1, sensheight2:sensheight2}})
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
                  $scope.options.series[0].label = String(result[1].senstypedescr);
                  
                  $scope.resultIsEmpty = false;
                  $scope.isAPICallSuccessful = true;
              }
          })
          .error(function(data, status, headers, config) {
              $scope.isAPICallSuccessful = false;
              //logs the corresponding error number in the console, see server/api/dataCount.controller.js, the reported error should be 503
              console.log(data);
          });
      };
  });

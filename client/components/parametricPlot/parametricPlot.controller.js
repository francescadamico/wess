'use strict';

angular.module('wessApp')
  .controller('ParametricplotCtrl', function ($scope, $http) {
      $scope.data;
      $scope.count;
      $scope.isAPICallSuccessful;
      
      $scope.loadPlot = function(day,station,senstypeid,measdescr,sensheight1,sensheight2,measname,sitesnum){ 

          $scope.options = {
              axes: {
                  x: {key: 'tick', type: 'date'},
                  y: {type: 'linear'}
              },
              /* only one series is displayed by default. Its label will be added                    * after the query is performed */
              series: [
                  {y: 'value1', color: 'steelblue', thickness: '2px', striped: true}
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
          
          /* if all the 3 sites are to be displayed, the query to call is the                    * hourlyAvgForDay3SitesParametric 
           */
          if(sitesnum == 'three_sites') {
              $http.get('/api/data/hourlyAvgForDay3SitesParametric', {params: {day:day, senstypeid:senstypeid, measdescr:measdescr}}) 
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
                      /* the two other series have to be added to the default one */
                      $scope.options.series[1] = {y: 'value2', color: 'red', thickness: '2px', striped: true, label: 'Poltringen'};
                      $scope.options.series[2] = {y: 'value3', color: 'green', thickness: '2px', striped: true, label: 'Tailfingen'};
                      /* the first series label has to be added */
                      $scope.options.series[0].label = 'Entringen';
                      $scope.resultIsEmpty = false;
                      $scope.isAPICallSuccessful = true;
                  }
              })
              .error(function(data, status, headers,config) {
                  $scope.isAPICallSuccessful = false;
                  console.log(data);
              });
          }
          else { /* if only one site is queried */
              /* if the type of query is cumulative rain than                                        * hourlyCumulativeRainForDay has to be called
               */
              if (measname == 'Cumulative Rain') {
                  $http.get('/api/data/hourlyCumulativeRainForDay', {params: {day: day,station:station}})
                  .success(function(result) {
                      //to check whether the query result is empty or not 
                      if (result.length === 0){
                          $scope.resultIsEmpty = true;
                          $scope.isAPICallSuccessful = true;
                      }
                      else {
                          $scope.data = result.map(function(datum) {
                              return {
                                  value1: Number(datum.value),
                                  tick: Date.parse(datum.tick)
                              };
                          });
                          /* the first series label has to be added and its value is                              * taken from the query itself
                           */
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
              }
              else { /* the query is of type: atmospheric temperature/humidity, wind speed, incoming-shortwave-radiation or soil temperature */
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
                                  value1: Number(datum.value),
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
              }
          }
      };
  });

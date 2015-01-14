'use strict';

angular.module('wessApp')
  .controller('ParametricplotCtrl', function ($scope, $http) {
      $scope.data;
      $scope.count;
      $scope.isAPICallSuccessful;
      
      /* loadPlot function:
       * it draws a plot with the result of the parametric query to the database
       * INPUTS: 
       * - (Date) day: the day to query;
       * - (Number) senstypeid: the corresponding sensor_type.sensor_type_id in the
       *        database
       * - (String) measdescr: description of the kind of measure; 
       *        it could be 'avg','tot' or 'sample';
       * - (String) measname: name of the measurement 
       *        (i.e. "atmospherical temperature");
       * - (Number) station: the station number (1,2 or 3);
       *        0 has to be chosen to query all the stations at the same time;
       * - (Number) sensheight: optional input; height or depth of the instrument. 
       */
      $scope.loadPlot = function(day,senstypeid,measdescr,measname,station,sensheight){ 

          //day,station,senstypeid,measdescr,sensheight1,sensheight2,measname,sitesnum
          
          $scope.options = {
              axes: {
                  x: {key: 'tick', type: 'date'},
                  y: {type: 'linear'}
              },
              /* only one series is displayed by default. Its label will be added after the query is performed */
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
          
          
              $http.get('/api/data/genericQuery', {params: {day:day, senstypeid:senstypeid, measdescr:measdescr, station:station}})
              .success(function(result) { 
                  //to check whether the query result is empty or not 
                  if (result.length === 0){
                      $scope.resultIsEmpty = true;
                      $scope.isAPICallSuccessful = true;
                  }
                  else {
                      if(station == 0) { // all the 3 sites
                          $scope.data = result.map(function(datum) {
                              return {
                                  value1: Number(datum.value1),
                                  value2: Number(datum.value2),
                                  value3: Number(datum.value3),
                                  tick: Date.parse(datum.tick)
                              };
                          });
                          /* the two other series have to be added to the default one */
                          $scope.options.series[1] = {y: 'value2', color: 'red', thickness: '2px', striped: true, label: 'Tailfingen'};
                          $scope.options.series[2] = {y: 'value3', color: 'green', thickness: '2px', striped: true, label: 'Poltringen'};
                          /* the first series label has to be added */
                          $scope.options.series[0].label = 'Entringen';
                          $scope.resultIsEmpty = false;
                          $scope.isAPICallSuccessful = true;
                      }
                      else {//station != 0
                          $scope.data = result.map(function(datum) {
                              return {
                                  value1: Number(datum.value),
                                  tick: Date.parse(datum.tick)
                              };
                          });
                          /* the first series label has to be added and its value is taken from the query itself
                           */
                          $scope.options.series[0].label = String(result[1].senstypedescr);
                          $scope.resultIsEmpty = false;
                          $scope.isAPICallSuccessful = true;
                      }
                  }
              })
              .error(function(data, status, headers,config) {
                    $scope.isAPICallSuccessful = false;
                    console.log(data);
              });
          
      };
  });

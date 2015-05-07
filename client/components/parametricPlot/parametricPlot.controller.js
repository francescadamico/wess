'use strict';

angular.module('wessApp')
  .controller('ParametricplotCtrl', function ($scope, $http) {
      $scope.isAPICallSuccessful;
    $scope.test;
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
      $scope.loadPlot = function(timeInterval,day,station,channel,statistic){ 
          
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
          
          // the data to display are from the day before
          if (day.getHours < 12)
              var newDay = new Date(Date.UTC(day.getFullYear(), day.getMonth(), day.getDate()-1, 11, 52, 59));
          else
              var newDay = new Date(Date.UTC(day.getFullYear(), day.getMonth(), day.getDate(), 11, 52, 59));

          var ii;
          
          /* get needed channel id numbers */
              $http.get('/api/data/chnId',{params: {station:station, channel:channel, statistic:statistic}})
                  .success(function(result) {
                      //to check whether the query result is empty or not
                      if (result.length === 0){
                          $scope.resultIsEmpty = true;
                          $scope.isAPICallSuccessful = true;
                      }
                      else {
                          var config;
                          // all the found channels are put into the chn array and passed to the data query
                          if (station === 'all') {
                              
                              $scope.chn_polt = [];
                              $scope.chn_ent = [];
                              $scope.chn_tail = [];
                              for (var i_chn=0; i_chn < result.length; i_chn++) {
                                   if (result[i_chn].chn_id_polt !== null)
                                      $scope.chn_polt.push(parseInt(result[i_chn].chn_id_polt)); 
                                   if (result[i_chn].chn_id_ent !== null)
                                      $scope.chn_ent.push(parseInt(result[i_chn].chn_id_ent));
                                   if (result[i_chn].chn_id_tail !== null)
                                      $scope.chn_tail.push(parseInt(result[i_chn].chn_id_tail));
                              };
                              
                              config = {params: {day:newDay, chn_polt:$scope.chn_polt, chn_ent:$scope.chn_ent, chn_tail:$scope.chn_tail, timeInterval:timeInterval, channel:channel, station:station}};
                              
                          }
                          else { // only one station
                              
                              $scope.chn = [];
                              for (i_chn=0; i_chn<result.length; i_chn++)
                                    $scope.chn.push(result[i_chn].chn_id);
                              
                              config = {params: {day:newDay, chn:$scope.chn, timeInterval:timeInterval, channel:channel, station:station}};
                          };
                          
                          $http.get('/api/data/dataQuery',config)
                              .success(function(response) {
                              if (response.length === 0){
                                  $scope.resultIsEmpty = true;
                                  $scope.isAPICallSuccessful = true;
                              }
                              else {
                                  if (station !== 'all') {
                                      $scope.data = response.map(function(datum) {
                                      return {
                                          value1: Number(datum.value),
                                          tick: Date.parse(datum.tick)
                                      };
                                      });
                                      $scope.options.series[0].label = station;
                                  }
                                  else {
                                      $scope.data = response.map(function(datum) {
                                          return {
                                              value1: Number(datum.val_polt),
                                              value2: Number(datum.val_ent),
                                              value3: Number(datum.val_tail),
                                              tick: Date.parse(datum.tick)
                                          };
                                      });
                                      $scope.options.series[0].label = 'Poltringen';
                                      $scope.options.series[1] = {y: 'value2', color: 'red', thickness: '2px', striped: true, label:'Entringen'};
                                      $scope.options.series[2] = {y: 'value3', color: 'green', thickness: '2px', striped: true, label: 'Tailfingen'};
                                  };
                              };
                              $scope.resultIsEmpty = false;
                              $scope.isAPICallSuccessful = true;
                          })
                              .error(function(data, status, headers,config) {
                                  console.log(data);
                          });
                          $scope.resultIsEmpty = false; 
                          $scope.isAPICallSuccessful = true;
                      }
              })
                  .error(function(data, status, headers,config) {
                        console.log(data);
              });

      };
  });

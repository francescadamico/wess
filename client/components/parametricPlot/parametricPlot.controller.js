'use strict';

angular.module('wessApp')
  .controller('ParametricplotCtrl', function ($scope, $http) {
      $scope.isAPICallSuccessful;
    var monthNames = ['Jenuary', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']; 
      /* loadPlot function:
       * it draws a plot with the result of the parametric query to the database
       * INPUTS: 
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
      $scope.loadPlot = function(timeInterval,station,channel,statistic){
          
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
                  mode: 'scrubber',
                  formatter: function (x, y, series) {
                      return moment(x).format('DD MMMM YYYY, h:mm a') + ' : ' + Math.round(y*100)/100;
                  }
              },
              lineMode: 'linear',
              tension: 0.7,
              drawLegend: true,
              drawDots: false//true
          };
          
          
          /* The $hhtp.get are performed one inside the other in order to get the queries answer in the right order, i.e. if each of them is inside a function that is called from the main code, they are called async, not allowing the dataQuery to use the result of the other two queries */
          
          /* get needed channel id numbers */
          $http.get('/api/data/chnId',{params: {station:station, channel:channel, statistic:statistic}})
              .success(function(result) {
              // to check whether the query result is empty or not
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

                      config = {params: {chn_polt:$scope.chn_polt, chn_ent:$scope.chn_ent, chn_tail:$scope.chn_tail, timeInterval:timeInterval, channel:channel, station:station}};
                      // the parameter day: will be added after the lastTs query
                  }
                  else { // only one station
                              
                      $scope.chn = [];
                      for (i_chn=0; i_chn<result.length; i_chn++)
                            $scope.chn.push(result[i_chn].chn_id);

                      config = {params: {chn:$scope.chn, timeInterval:timeInterval, channel:channel, station:station}};
                      // the parameter day: will be added after the lastTs query
                  };
                  
                  /* find the last timestamp in the database -needed for the weather section that shows the last-day/last-month data  */
                  $http.get('/api/data/lastTs')
                      .success(function(resultTs) {
                      // to check whether the query result is empty or not
                      if (resultTs.length === 0) {
                          $scope.resultIsEmpty = true;
                          $scope.isAPICallSuccessful = true;
                      }
                      else {
                          var lastTimestamp = new Date(resultTs[0].ts);
                          var lastTimestamp_from = new Date();
                          // sets the first date to be displayed to:
                          //    - in case of 'One day' -> 1 day before the last timestamp found
                          //    - in case of 'One month' -> 30 days before
                          if (timeInterval === 'One day')
                              lastTimestamp_from.setDate(lastTimestamp.getDate()-1);
                          else
                              lastTimestamp_from.setDate(lastTimestamp.getDate() -30);

                          // string to display the date, e.g. "26 April 2015 -- 26 May 2015"
                          $scope.dateString = lastTimestamp_from.getDate() + " " + monthNames[lastTimestamp_from.getMonth()] + " " + lastTimestamp_from.getFullYear() + " -- " + lastTimestamp.getDate() + " " + monthNames[lastTimestamp.getMonth()] + " " + lastTimestamp.getFullYear();

                          config.params.day = lastTimestamp;
                          
                          /* query the desired data */
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
                                  else { // station == 'all'
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
                                  /* to avoid the resize of y-axis under a certain value, to avoid that the y axis disappears in case of a plot function y=0 */
                                  var someUsualValue = 1;
                                  var usualMax = d3.max($scope.data, function(d){ 
                                      var maxValue;
                                      if (d.value2 != null) {
                                          maxValue = Math.max(d.value1,d.value2,d.value3);
                                          return maxValue+1 || someUsualValue;
                                      }
                                      else {
                                          return d.value1+1 || someUsualValue;
                                      }
                                  });
                                  $scope.options.axes.y.max = usualMax;
                                  
                              };
                              // ... continue dataQuery 
                              $scope.resultIsEmpty = false;
                              $scope.isAPICallSuccessful = true;
                          })
                          // ... continue dataQuery
                              .error(function(data, status, headers,config) {
                                  console.log(data);
                          });
                      };
                      // ... continue lastTs
                      $scope.resultIsEmpty = false;
                      $scope.isAPICallSuccessful = true;
                  })
                  // ... continue lastTs
                      .error(function(data, status, headers) {
                              console.log(data);
                  });
                  // ... continue chnId
                  $scope.resultIsEmpty = false; 
                  $scope.isAPICallSuccessful = true;
              };
          })
          // ... continue chnId
              .error(function(data, status, headers,config) {
              console.log(data);
          });
      };
  });

'use strict';

angular.module('wessApp')
  .controller('AllSitesCtrl', function ($scope, $http) {
  
    /*$scope.data;
    $scope.isAPICallSuccessful;
    $scope.resultIsEmpty;
    
    var measurement_name = 'Atmospheric Temperature';
    var senstypeid = 3;
    var measdescr = 'sample';*/

      
      $scope.day = new Date(Date.UTC(2014, 2, 22)); //it creates a UTC date to be given to the server for the query
      
      $scope.monthNames = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
    
      $scope.plots = [
      {
          measurement_name:'Atmospheric Temperature',
          senstypeid: 7,
          measdescr:'avg',
          /*sensheight1: 187,
          sensheight2: 287*/
      },
      {
          measurement_name:'Atmospheric Humidity',
          senstypeid: 6,
          measdescr:'avg',
          /*sensheight1: 187,
          sensheight2: 287*/
      },
      {
          measurement_name:'Wind Speed',
          senstypeid: 4,
          measdescr:'avg',
          /*sensheight1: 187,
          sensheight2: 287*/
      }
      /*{
          measurement_name:'Incoming Short-Wave Radiation',
          senstypeid: 10,
          measdescr:'avg',
          sensheight1: 150,
          sensheight2: 150
      },
      {
          measurement_name:'Cumulative Rain',
          senstypeid: 14,
          measdescr:'tot',
          sensheight1: 0,
          sensheight2: 0
      },
      {
          measurement_name:'Soil Temperature',
          senstypeid: 3,
          measdescr:'sample',
          sensheight1: 10,
          sensheight2: 10
      }*/
    ];
      
      
      
      
    /*$scope.options = {
      axes: {
        x: {key: 'tick', type: 'date'},
        y: {type: 'linear'}
      },
      series: [
          {y: 'value1', color: 'steelblue', thickness: '2px', striped: true, label: 'Poltringen'},
          
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
    };*/
    
      /*$http.get('/api/data/hourlyAvgForDay3Sites', {params: {day: $scope.day, senstypeid:senstypeid, measuredescr:measuredescr}}) */
    /*$http.get('/api/data/hourlyAvgForDay3SitesParametric', {params: {day: $scope.day, senstypeid:senstypeid, measdescr:measdescr}}) 
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
          $scope.options.series[1] = {y: 'value2', color: 'red', thickness: '2px', striped: true, label: 'Tailfingen'};
          $scope.options.series[2] = {y: 'value3', color: 'green', thickness: '2px', striped: true, label: 'Entringen'};
        $scope.resultIsEmpty = false;
        $scope.isAPICallSuccessful = true;
      }
    })
    .error(function(data, status, headers,config) {
      $scope.isAPICallSuccessful = false;
      console.log(data);
    });*/
  });

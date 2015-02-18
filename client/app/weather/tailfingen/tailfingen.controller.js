'use strict';

angular.module('wessApp')
  .controller('TailfingenCtrl', function ($http, $scope) {
      /* $scope.firstCall controls the part of the html that has to be loaded:
       *    when $scope.firstCall == true, the pageStructure is called loading 
       *    the navigation bar and the left menu. After that pageStructures sets
       *    $scope.firstCall = "false" and the content is displayed (see html)
       */
      $scope.firstCall = "true";     

      $scope.day = new Date(Date.UTC(2014, 2, 25, 12, 0, 0)); //it creates a UTC date to be given to the server for the query, data start at midday
      $scope.monthNames = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
      
      $scope.timeInterval = 'One day';
      $scope.station = 2;
      $scope.plots = [
          {
              measurement_name:'Atmospheric Temperature',
              senstypeid: 7,
              measdescr:'avg'
          },
          {
              measurement_name:'Atmospheric Humidity',
              senstypeid: 6,
              measdescr:'avg'
          },
          {
              measurement_name:'Wind Speed',
              senstypeid: 4,
              measdescr:'avg'
          },
          {
              measurement_name:'Incoming Short-Wave Radiation',
              senstypeid: 10,
              measdescr:'avg'
          },
          {
              measurement_name:'Cumulative Rain',
              senstypeid: 14,
              measdescr:'tot'
          },
          {
              measurement_name:'Soil Temperature',
              senstypeid: 3,
              measdescr:'sample'
          }
      ];
      
      // listener to the "timeSelector" message 
      $scope.$on("timeSelector", function(eventContext, timeInterval){
          $scope.timeInterval = timeInterval;
          // React to the event.
      });
  });
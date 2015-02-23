'use strict';

angular.module('wessApp')
  .controller('DataCtrl', function ($scope) {
      
      /* Calendar directives*/
      $scope.datepickers = {
          from : false,
          to : false
      }
      $scope.minDate_to = null;
      $scope.maxDate_from = null;

      $scope.today = function() {
          $scope.formData_from = new Date(Date.UTC(2014, 3, 31, 12, 0, 0));
          $scope.formData_to = new Date(Date.UTC(2014, 3, 31, 12, 0, 0));
          $scope.todayDate = new Date(Date.UTC(2014, 3, 31, 12, 0, 0));
      };
      $scope.today();

      /* the min date of the 'from' datepicker has to be fixed 
       * the min date of the 'to' datepicker has to be either the 
       * the absolut min date or the selected 'from' date
       */
      $scope.toggleMin = function() {
          $scope.minDate_to = $scope.minDate_to ? null : new Date(Date.UTC(2013, 1, 1, 12, 0, 0));
          $scope.minDate_from = new Date(Date.UTC(2013, 1, 1, 12, 0, 0));
      };
      $scope.toggleMin();
      
      /* the max date of the 'to' datepicker has to be fixed 
       * the max date of the 'from' datepicker has to be either the 
       * the absolut max date or the selected 'to' date
       */
      $scope.toggleMax = function() {
          $scope.maxDate_from = $scope.maxDate_from ? null : new Date(Date.UTC(2014, 3, 31, 12, 0, 0));
          $scope.maxDate_to = new Date(Date.UTC(2014, 3, 31, 12, 0, 0));
      };
      $scope.toggleMax();
      
      /* this function runs only when the datepicker is opened */
      $scope.open = function($event,which) {
          $event.preventDefault();
          $event.stopPropagation();
          
          $scope.datepickers[which] = true;
          if($scope.formData_from < $scope.todayDate)
              $scope.minDate_to = $scope.formData_from;
          if($scope.formData_to < $scope.todayDate)
              $scope.maxDate_from = $scope.formData_to;
      };

      $scope.dateOptions = {
          formatYear: 'yy',
          startingDay: 1
      };

      $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
      $scope.format = $scope.formats[0];
      
      /* handle formData_from, formData_to */
      /*****************************************************/
      
      /* andle sites */
      $scope.sites = [
          {
              status: 'false',
              label: 'Entringen'
          },
          {
              status: 'false',
              label: 'Poltringen'
          },
          {
              status: 'false',
              label: 'Tailfingen'
          }
      ];
      
      /* Type of measurements directive */
      $scope.typeMeas = [
          {
              type: 'Atmospheric',
              plots: [
                  {
                      status: false,
                      name: 't_windspeed',
                      label: 'Time/Wind speed'
                  },
                  {
                      status: false,
                      name: 't_winddir',
                      label: 'Time/Wind direction'
                  },
                  {
                      status: false,
                      name: 't_temp',
                      label: 'Time/Temperature',
                  },
                  {
                      status: false,
                      name: 't_hum',
                      label: 'Time/Humidity'
                  }
              ],
          },
          {
              type: 'Surface',
              plots: [
                  {
                      status: false,
                      name: 't_sunlight',
                      label: 'Time/Sun light (net radiation)' 
                  },
                  {
                      status: false,
                      name: 't_rain',
                      label: 'Time/Rain' 
                  },
                  {
                      status: false,
                      name: 't_soilheat',
                      label: 'Time/Soil heat flux' 
                  },
                  {
                      status: false,
                      name: 't_soiltemp',
                      label: 'Time/Soil temperature' 
                  },
                  {
                      status: false,
                      name: 't_soilwater',
                      label: 'Time/Soil water content' 
                  }
              ]
          },
          {   
              type: 'Subsurface',
              plots: [
                  {
                      name: 't_temp',
                      label: 'Time/Temperature'  
                  },
                  {
                      name: 't_water_sub',
                      label: 'Time/Water'  
                  },
                  {
                      name: 't_tens',
                      label: 'Time/Tensiometer'  
                  }
              ]
          }
      ];
      
      $scope.oneAtATime = true;
      $scope.status = {
          isFirstOpen: true,
          isFirstDisabled: false
      };
      
      /* button handler */
      /*$scope.showPlots = false;
      $scope.timeInterval = 'One day';
      $scope.senstypeid = 7;
      $scope.measdescr = 'avg';
      $scope.measurement_name = 'Atmospheric Temperature';
      $scope.station = 1;*/

  });

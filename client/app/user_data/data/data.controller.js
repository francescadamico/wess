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
          $scope.formData_from = new Date;
          $scope.formData_to = new Date; 
          $scope.todayDate = new Date;
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
       * TODO: the max date shouldn't be today, but it should be queried with lastTs
       */
      $scope.toggleMax = function() {
          $scope.maxDate_from = $scope.maxDate_from ? null : new Date;
          $scope.maxDate_to = new Date;
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
      
      /* handle sites */
          
    $scope.sites = [
        { label: 'Entringen', selected: false, atmo_station: 'ent_perm', subsurf_station: 'uit_1'},
        { label: 'Poltringen', selected: false, atmo_station: 'polt', subsurf_station: 'uit_3'},
        { label: 'Tailfingen', selected: false, atmo_station: 'tail', subsurf_station: 'uit_2'}
    ];
    
    // selected site
    $scope.selectionS = [];
    
    // helper method to get selected sites
    $scope.selectedSites = function selectedSites() {
        return filterFilter($scope.sites, { selected: true});
    };
    
    // watch sites for changes
    $scope.$watch('sites|filter:{selected:true}', function(nv) {
        $scope.selectionS = nv.map(function (site) {
            // at this point of the selection the whole site has to be selected because we still don't know whether the atmo_station or the subsurf_station will be needed
            return site;
        });
    }, true);
    
        
      /* Type of measurements directive */
      $scope.typeMeas = [  
          { type: 'Atmospheric', selected: false, name: 't_windspeed', label: 'Time/Wind speed', channel: 'WindSpd__', statistic: 'Avg' },
          { type: 'Atmospheric', selected: false, name: 't_winddir', label: 'Time/Wind direction', channel: 'WindDir__', statistic: 'Avg' },
          { type: 'Atmospheric', selected: false, name: 't_temp', label: 'Time/Temperature', channel: 'AirTemp__', statistic: 'Avg' },
          { type: 'Atmospheric', selected: false, name: 't_hum', label: 'Time/Humidity', channel: 'RH__', statistic: 'Avg' },
          { type: 'Surface', selected: false, name: 't_sunlight', label: 'Time/Sun light (net radiation)', channel: 'NetRs', statistic: 'Avg' }, // NOTE: this is only the net shortwave radiation 
          { type: 'Surface', selected: false, name: 't_rain', label: 'Time/Rain', channel: 'Rain_mm', statistic: 'Tot' },
          { type: 'Surface', selected: false, name: 't_soilheat', label: 'Time/Soil heat flux', channel: 'SoilHF__', statistic: 'Avg' },
          { type: 'Surface', selected: false, name: 't_soiltemp', label: 'Time/Soil temperature', channel: 'SoilTemp__', statistic: 'Avg' },
          { type: 'Surface', selected: false, name: 't_soilwater', label: 'Time/Soil water content', channel: 'SoilVWC__', statistic: 'Avg' },
          // for the moment we plot the subsurface measurements at -10cm in one position, but in the future we will have to plot5 lines at 5 different depth averaged in 5 different positions
          { type: 'Subsurface', selected: false, name: 't_temp', label: 'Time/Temperature', channel: 'SoilTemp01', statistic: 'Smp' },
          { type: 'Subsurface', selected: false, name: 't_water_sub', label: 'Time/Water', channel: 'SoilPermittivity01', statistic: 'Smp' },
          { type: 'Subsurface', selected: false, name: 't_tens', label: 'Time/Tensiometer', channel: 'Tensio01', statistic: 'Smp' }
      ];
    
    // selected plot
    $scope.selectionP = [];
    
    // helper method to get selected plots
    $scope.selectedPlots = function selectedPlots() {
        return filterFilter($scope.typeMeas, { selected: true});
    };
    
    // watch selected plots for changes
    $scope.$watch('typeMeas|filter:{selected:true}', function(nv) {
        $scope.selectionP = nv.map(function (plot) {
            return plot;
        });
    });
    
    // watch if both typeMeas and sites have been selected
    // NOTE: for the moment it works only for one selected site and typeMeas
    $scope.watcher;
    $scope.chosenStation = [];
    $scope.count = 0;
    
    $scope.$watchGroup([function(){ return $scope.selectionS; }, function(){ return $scope.selectionP; }], function(nv,ov) {
        // nv[0] corresponds to selected site; nv[1] to selected plot
        if (nv[0]!=ov[0] && nv[1]!=ov[1] && nv[0]!= [] && nv[1]!= []) {
            for(var sS=0; sS<nv[0].length; sS++) {
                for(var sP=0; sP<nv[1].length; sP++) {
                    if (nv[1][sP].type == 'Atmospheric'||nv[1][sP].type == 'Surface') {
                        $scope.chosenStation = nv[0][sS].atmo_station;
                    }
                    else {
                        $scope.chosenStation = nv[0][sS].subsurf_station;
                    }
                    $scope.testnv = nv[0].length; 
                    $scope.chosenChannel = nv[1][sP].channel;
                    $scope.chosenStatistic= nv[1][sP].statistic;
                    $scope.testnv[sS] = nv[0];
                    //$scope.testnv = nv[0].length; 
                    $scope.chosenChannel = nv[1][sP].channel;
                    $scope.chosenStatistic= nv[1][sP].statistic;
                    $scope.count ++;
                    $scope.watcher = 'OK';
                    document.getElementById("plotBtn").disabled = false;
                }
            }
        }
        $scope.num_plot = nv[0].length * nv[1].length;

    });
  });

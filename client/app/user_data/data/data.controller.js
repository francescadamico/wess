'use strict';

angular.module('wessApp')
  .controller('DataCtrl', function ($scope) {
    
    /* plots objects and specifics: every plot object will have the structure: 
    {
        chosenStation:,
        chosenChannel:,
        chosenStatistic:,
        formData_to:
    } 
    */
    $scope.plotItems = [];
    function Plot(chosenStation, chosenChannel, chosenStatistic, formData_to, label) {
        this.chosenStation = chosenStation;
        this.chosenChannel = chosenChannel;
        this.chosenStatistic = chosenStatistic;
        this.formData_to = formData_to;
        this.label = label;
    }
    
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
    $scope.$watch('sites|filter:{selected:true}', function(nv,ov) {
        /* every time a new site is chosen or an already selected value is removed, the existing plots have to be removed */
        if (!isEqualArray(nv,ov))
            $scope.showPlots = false;
        $scope.selectionS = nv.map(function (site) {
            // at this point of the selection the whole site has to be selected because we still don't know whether the atmo_station or the subsurf_station will be needed
            return site;
        });
        /* enables the "Show plots" button only if at least one value for site and measType have been selected */
        if ($scope.selectionP.length != 0 && $scope.selectionS.length != 0) {
            document.getElementById("plotBtn").disabled = false;
        }
        else {
            document.getElementById("plotBtn").disabled = true;
        };
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
    
    // helper method to get the selected plots
    $scope.selectedPlots = function selectedPlots() {
        return filterFilter($scope.typeMeas, { selected: true});
    };
    
    // watch the selected plots for changes
    $scope.$watch('typeMeas|filter:{selected:true}', function(nv,ov) {
        /* every time a new measType is chosen or an already selected value is removed, the existing plots have to be removed */
        if (!isEqualArray(nv,ov))
            $scope.showPlots = false;
        $scope.selectionP = nv.map(function (plot) {
            return plot;
        });
        /* enables the "Show plots" button only if at least one value for site and measType have been selected */
        if ($scope.selectionP.length != 0 && $scope.selectionS.length != 0) {
            document.getElementById("plotBtn").disabled = false;
        }
        else {
            document.getElementById("plotBtn").disabled = true;
        };
    });
    
    $scope.plotFunct = function plotFunct() {
        /* clean $scope.plotItems */
        $scope.plotItems = [];
        for(var sS=0; sS<$scope.selectionS.length; sS++) {
            for(var sP=0; sP<$scope.selectionP.length; sP++) {
                if ($scope.selectionP[sP].type == 'Atmospheric'||$scope.selectionP[sP].type == 'Surface') {
                    $scope.chosenStation = $scope.selectionS[sS].atmo_station;
                }
                else {
                    $scope.chosenStation = $scope.selectionS[sS].subsurf_station;
                } 
                $scope.chosenChannel = $scope.selectionP[sP].channel;
                $scope.chosenStatistic = $scope.selectionP[sP].statistic;
                $scope.label = $scope.selectionP[sP].label;
                
                $scope.plotItems[sP+sS*$scope.selectionP.length] = new Plot($scope.chosenStation, $scope.chosenChannel, $scope.chosenStatistic, $scope.formData_to, $scope.label); 
            }
        }
        $scope.showPlots = true;
    };
    
    /* util to compare arrays, TODO: it has to be moved to a util file */
    function isEqualArray(arr1,arr2) {
        if (arr1.length != arr2.length)
            return false;
        for (var ii=0; ii<arr1.length; ii++) {
             if (arr1[ii] != arr2[ii])
                 return false;
        }
        return true;
    };
});

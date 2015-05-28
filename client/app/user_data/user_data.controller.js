'use strict';

angular.module('wessApp')
  .controller('UserDataCtrl', function ($scope) {
    
    $scope.myInterval = 5000;
    $scope.slides = [
        {
            name: 'Julia Knapp',
            affiliation: 'MSc., Hydrogeology, University of Tübingen',
            description: 'We are interested in respiration and primary production rates in small tributaries to the Ammer river. For this, we perform gas tracer tests to determine the reaeration flux across the air water interface. From oxygen measurements, together with short wave solar radiation data (provided by the Ammertal network project), we are then able to model diurnal curves of respiration and primary production. So far, studies of this type have been conducted for the Himbach and for a short section of the Ammer itself.'
        },
        {
            name: 'clacla',
            affiliation: 'clacla',
            description: 'clacla'
        },
        {
            name: 'dladla',
            affiliation: 'dladla',
            description: 'dladla'
        }
    ]
  });

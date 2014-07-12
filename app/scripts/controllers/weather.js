'use strict';

angular.module('wessApp')
  .controller('WeatherCtrl', function ($scope) {
    
    $scope.data = [
      {x: 0, value: 4, otherValue: 14},
      {x: 1, value: 8, otherValue: 1},
      {x: 2, value: 15, otherValue: 11},
      {x: 3, value: 16, otherValue: 147},
      {x: 4, value: 23, otherValue: 87},
      {x: 5, value: 42, otherValue: 45}
    ];
    
    $scope.options = {
      axes: {
        x: {key: 'x', labelFunction: function(value) {return value;}, type: 'linear', tooltipFormatter: function(x) {return x;}},
        y: {type: 'linear', min: 0, max: 1},
        y2: {type: 'linear', min: 0, max: 1}
      },
      series: [
        {y: 'value', color: 'steelblue', thickness: '2px', type: 'area', striped: true, label: 'Pouet'},
        {y: 'otherValue', axis: 'y2', color: 'lightsteelblue', visible: false}
      ],
      lineMode: 'linear',
      tension: 0.7,
      tooltipMode: 'dots',
      drawLegend: true,
      drawDots: true
    };
    
  });

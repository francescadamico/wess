'use strict';

angular.module('wessApp')
  .controller('DropdownintervalCtrl', function ($scope) {
      $scope.timeItems = [
          'One day',
          'One month'
      ];
      
      $scope.timeSelector = function(choice){
          // when choice is selected from the dropdown menu a message "timeSelector" is produced and its value is passed to the listener of "timeSelector" message -in all_sites.controller-
          $scope.$emit("timeSelector",choice);
      };
  });
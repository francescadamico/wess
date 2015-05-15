'use strict';

angular.module('wessApp')
  .controller('DropdownintervalCtrl', function ($scope) {
      
      $scope.timeItems = [
          'One day',
          'One month'
      ];
      
      $scope.toggleDropdown = function($event) {
    $event.preventDefault();
    $event.stopPropagation();
    $scope.status.isopen = !$scope.status.isopen;
  };
      $scope.status = {
    isopen: false
  };
      
      $scope.buttonName = $scope.timeItems[0]; // default value
      $scope.timeSelector = function(choice){
          // when choice is selected from the dropdown menu a message "timeSelector" is produced and its value is passed to the listener of "timeSelector" message -in all_sites.controller-
          $scope.buttonName = choice;
          $scope.status.isopen = !$scope.status.isopen;
          $scope.$emit('timeSelector',choice);
      };
  });
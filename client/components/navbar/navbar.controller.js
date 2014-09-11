'use strict';

angular.module('wessApp')
  .controller('NavbarCtrl', function ($scope, $location) {
    $scope.menu = [
      {
        'title': 'Home',
        'link': '/'
      },
      {
        'title': 'Weather',
        'link': '/weather'
      },
      {
        'title': 'User data',
        'link': '/user_data'
      }
    ];

    $scope.isCollapsed = true;

    //this method is used to apply the active class to our navigation elements defined in $scope.menu
    $scope.isActive = function(route) {         
        //check on which hierarchy level we currently are
        if ($location.path().split("/").length > 2) {
          /*in here we are at least 1 level below top-level
            so we grab the top-level part of the current path with $location.path().split("/")[1]
            and compare it to the route of the navigation element
          */
          if (route === "/") {
            /*being here means we were called by our navigation element "Home" while on a page below top-level
              the "child" pages of our top-level page home have "/main" as top-level part of their route
              but our top-level page home uses "/" as route
              so instead of comparing the top-level portion of the "child" page's path to the route we compare it to "/main"
            */
            return "/" + $location.path().split("/")[1] === "/main";            
          }
          else {
            /*for our other top-level navigation elements 
              we simply compare the top-level part of the path
              to the top-level navgition element's route
            */
            return "/" + $location.path().split("/")[1] === route;            
          }                    
        }
        else {
          /*in here we are on the top-level 
            so we just compare the current path to the route
          */
          return route === $location.path();
        }
    };
  });
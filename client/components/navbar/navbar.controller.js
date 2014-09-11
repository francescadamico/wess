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

    $scope.isActive = function(route) {
        /* this if statement checks whether the current route path includes 
        '/main', '/weather' or '/userdata' in order to highlight the corrispondent tab 
        in the primary navbar.
        The statement could be optimized by searching through $scope.menu.item.link 
        but the main url, i.e. '/' is an issue for the search because it is always found
        */
        if ($location.path().search('/main') !== -1) {
            return route === "/"; // '/main' would not be correct because the item.link corresponding to item.name === 'Home' is '/'
        }
        else if ($location.path().search('/weather') !== -1) {
            return route === "/weather";
        }
        else if ($location.path().search('/user_data') !== -1) {
            return route === "/user_data";
        }
        else {
            return route === $location.path();
        }
    };
  });
'use strict';

angular.module('wessApp')
  .controller('NavbarCtrl', function ($scope, $location) {
    $scope.menu = [
        {
            'title': 'Home',
            'link': '/',
            'menupath': 'components/leftmenu/leftmenu.html'
        },
        {
            'title': 'Weather',
            'link': '/weather',
            'menupath': 'components/leftmenuweather/leftmenuweather.html'
        },
        {
            'title': 'User data',
            'link': '/user_data',
            'menupath': 'components/leftmenuuser/leftmenuuser.html'
        }
    ];

    $scope.isCollapsed = true;

    //this method is used to apply the active class to our navigation elements defined in $scope.menu
    $scope.isActive = function(route) {         
        //check on which hierarchy level we currently are
        if ($location.path().split('/').length > 2) {
            /* in here we are at least 1 level below top-level
             * so we grab the top-level part of the current path with $location.path().split("/")[1]
             * and compare it to the route of the navigation element
            */
            if (route === '/') {
                /* being here means we were called by our navigation element "Home" while on a page below top-level
                 * the "child" pages of our top-level page home have "/main" as top-level part of their route
                 * but our top-level page home uses "/" as route
                 * so instead of comparing the top-level portion of the "child" page's path to the route we compare it to "/main"
                 */
                return '/' + $location.path().split('/')[1] === '/main';
            }
            else {
                /* for our other top-level navigation elements 
                 * we simply compare the top-level part of the path
                 * to the top-level navgition element's route
                 */
                return '/' + $location.path().split('/')[1] === route;
            }
        }
        else {
            /* in here we are on the top-level 
             * so we just compare the current path to the route
             */
            return route === $location.path();
        }
    };
      /* method to give the right title (i.e. the upper level page name)
        to the left menus
      */
      $scope.addTitleToLeftMenu = function() {
          /* Home has to be hand written because the url of the parent page
           * is different from the url of the children 
           */
          if ($location.path().split('/')[1] === 'main') {
              return 'Home';
          }
          else {
              for ($scope.i = 0; $scope.i < $scope.menu.length; $scope.i++) {
                  if (('/' + $location.path().split('/')[1]) === $scope.menu[$scope.i].link) {
                      return $scope.menu[$scope.i].title;
                  }
              }
          }
      };
      
      /* method to give the right leftMenu to the page */
      $scope.leftMenuPath = function() {
          if ($location.path().split('/')[1] === 'main') {
              return $scope.menu[0].menupath;
          }
          else {
              for ($scope.i = 0; $scope.i < $scope.menu.length; $scope.i++) {
                  if (('/' + $location.path().split('/')[1]) === $scope.menu[$scope.i].link) {
                      return $scope.menu[$scope.i].menupath;
                  }
              }
          }
      };
  });
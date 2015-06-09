'use strict';

angular.module('wessApp')
  .controller('GalleryCtrl', function ($scope, $modal) {
      /* $scope.firstCall controls the part of the html that has to be loaded:
       *    when $scope.firstCall == true, the pageStructure is called loading 
       *    the navigation bar and the left menu. After that pageStructures sets
       *    $scope.firstCall = "false" and the content is displayed (see html)
       */
      $scope.firstCall = 'true';
      
      var num_pics = 41;
      $scope.pictures = [];
      
      for (var i=1; i<num_pics; i++) {
          $scope.pictures.push({
              'thumb': '../../assets/images/image'+i+'_tn.jpg',
              'img': '../../assets/images/image'+i+'.jpg'
          });
      }
      
      /* function to set the image path to a certain path given from the html, in this case it is
       * taken as pic in $scope.pictures, so it is one of the path given above */
      $scope.setImage = function(imageUrl) {
          $scope.picIdx = $scope.pictures.indexOf(imageUrl); 
      };

      /* open function: it opens the modal pop-up window and it fills it with the html given by templateUrl
       * and controlled by PicmodalCtrl.
       * Using resolve, the mainImageUrl is passed to the PicmodalCtrl allowing it to be
       * visible in that $scope as well */
      $scope.open = function (templateUrl) {
          $modal.open({
              templateUrl: templateUrl,
              controller: 'PicmodalCtrl',
              resolve: {
                  pictures: function () {
                      return $scope.pictures;
                  },
                  picIdx: function () {
                      return $scope.picIdx;
                  } 
              }
          });
      };
  });

/* */
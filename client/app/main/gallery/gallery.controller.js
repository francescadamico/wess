'use strict';

angular.module('wessApp')
  .controller('GalleryCtrl', function ($scope, $modal) {
      // list of the pictures
      $scope.pictures = [
          {
              'thumb': '../../assets/images/image1_tn.jpg',
              'img': '../../assets/images/image1.JPG'
          }, 
          {
              'thumb': '../../assets/images/image2_tn.jpg',
              'img': '../../assets/images/image2.JPG'
          },
          {
              'thumb': '../../assets/images/image3_tn.jpg',
              'img': '../../assets/images/image3.JPG'
          },
          {
              'thumb': '../../assets/images/image4_tn.jpg',
              'img': '../../assets/images/image4.JPG'
          }, 
          {
              'thumb': '../../assets/images/image5_tn.jpg',
              'img': '../../assets/images/image5.JPG'
          },
          {
              'thumb': '../../assets/images/image6_tn.jpg',
              'img': '../../assets/images/image6.JPG'
          }
    ];
      
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
          var modalInstance = $modal.open({
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
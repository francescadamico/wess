'use strict';

angular.module('wessApp')
  .controller('GalleryCtrl', function ($scope, $modal) {
      // list of the pictures
      $scope.pictures = ["../../assets/images/image1.JPG", "../../assets/images/image2.JPG", "../../assets/images/image3.JPG", "../../assets/images/image4.JPG", "../../assets/images/image5.JPG", "../../assets/images/image6.JPG"
    ];
      
      /* function to set the image path to a certain path given from the html, in this case it is
       * taken as pic in $scope.pictures, so it is one of the path given above */
      $scope.setImage = function(imageUrl) {
          $scope.mainImageUrl = imageUrl;
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
                  mainImageUrl: function () {
                      return $scope.mainImageUrl;
                  }
              }
          });
      };
  });

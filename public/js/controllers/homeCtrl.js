ufoApp.controller('homeCtrl', ['$scope', 'auth', 'imgur', function($scope, auth, imgur){
    $scope.title = "home Page!";
    $scope.isLoggedIn = auth.isLoggedIn;

    var imgurStuff = new imgur('09da5770eeb1e29');

    imgurStuff.getGalleryTag("ufo").then(function(result) {
        $scope.getResult = result.data.items[2];
    }, function(error) {
        console.error(error);
    });
}]);
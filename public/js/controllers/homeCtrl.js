// Controller made for the home page
ufoApp.controller('homeCtrl', ['$scope', 'auth', 'imgur', function($scope, auth, imgur) {
    $scope.title = "home Page!";
    $scope.isLoggedIn = auth.isLoggedIn;

    // Show a random image from the Imgur UFO gallery
    var imgurStuff = new imgur('09da5770eeb1e29');
    var randomInt = Math.floor((Math.random() * 45));

    imgurStuff.getGalleryTag("ufo").then(function(result) {
        $scope.getResult = result.data.items[randomInt];
    }, function(error) {
        // If error show it on console
        console.error(error);
    });
}]);

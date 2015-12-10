ufoApp.controller('homeCtrl', ['$scope', 'auth', 'imgur', function($scope, auth, imgur){
    $scope.title = "home Page!";
    $scope.isLoggedIn = auth.isLoggedIn;

    var imgurStuff = new imgur('09da5770eeb1e29');

    imgurStuff.getGalleryTag("ufo").then(function(result) {
        console.log(result);
        console.log(result.data);
        console.log(result.data.items);
        console.log(result.data.items[0]);
        $scope.getResult = result.data.items[0];
    }, function(error) {
        console.error(error);
    });

    /*
    myParams = {
        // Image can be a url, a binary file provided by the user or base64 data
        // Here a url just to test functionality
        image: "https://upload.wikimedia.org/wikipedia/commons/d/db/Titanic-Cobh-Harbour-1912.JPG"
    };
    imgurStuff.uploadImage(myParams).then(function(result) {
        // You can access the url to the image in the following way:
        // -> result.data.link
        console.log(result.data.link)
    }, function(error) {
        console.error(error);
    });
    */
}]);
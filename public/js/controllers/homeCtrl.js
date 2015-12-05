ufoApp.controller('homeCtrl', ['$scope', 'auth', function($scope, auth){
    $scope.title = "home Page!";
    $scope.isLoggedIn = auth.isLoggedIn;
}]);
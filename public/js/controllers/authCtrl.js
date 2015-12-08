ufoApp.controller('authCtrl', 
  ['$scope', '$state', 'auth',
  function($scope, $state, auth){
    $scope.user = {};
    
    $scope.signup = function(){
      auth.signup($scope.user).error(function(error){
        $scope.error = error;
      }).then(function(){
        $state.go('sightings');
      });
    };
    
    $scope.login = function(){
      auth.login($scope.user).error(function(error){
        $scope.error = error;
      }).then(function successCallback(){
        $state.go('sightings');
      });
    };
}])
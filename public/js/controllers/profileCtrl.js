ufoApp.controller('profileCtrl', ['$scope','auth',
	function($scope, auth){
		$scope.currentUser = auth.currentUser;
}]);
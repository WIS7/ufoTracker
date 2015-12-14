ufoApp.controller('navCtrl', ['$scope', '$state', 'auth',
	function ($scope, $state, auth) {
		$scope.isLoggedIn = auth.isLoggedIn;
		$scope.currentUser = auth.currentUser;
		$scope.logOut = auth.logout;

		$scope.searchAll = function () {
			var searchParam = $scope.searchField;
			$scope.searchField = '';
			$state.go('search', {
				_searchParam: searchParam
			})
		}
}]);
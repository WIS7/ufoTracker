// Controller that handles the NavBar
ufoApp.controller('navCtrl', ['$scope', '$state', 'auth',
	function ($scope, $state, auth) {
		$scope.isLoggedIn = auth.isLoggedIn;
		$scope.currentUser = auth.currentUser;
		$scope.logOut = auth.logout;

		// What to do when "Search" is clicked
		$scope.searchAll = function () {
			var searchParam = $scope.searchField;
			$scope.searchField = '';
			// Go to the Search page and pass the input as parameter
			$state.go('search', {
				_searchParam: searchParam
			})
		}
}]);

ufoApp.controller('profileCtrl', ['$scope', '$stateParams', 'auth', 'sightings',
	function ($scope, $stateParams, auth, sightings) {
		$scope.sighting = {};
		$scope.readOnly = false;

		// Check if someone is visiting a profile or just opening his own
		if ($stateParams._username === '') {
			// No username provided so just opening his own
			$scope.user = auth.currentUser()
		}
		else {
			// Username provided so no editing possible
			$scope.readOnly = true;
			$scope.user = $stateParams._username
		}

		var Notification = window.Notification || window.mozNotification || window.webkitNotification;

		// Need to ask the user for permission to show notifications
		Notification.requestPermission(function (permission) {
			// console.log(permission);
		});

		// Function that shows the notification
		var showNotification = function(message) {
			var instance = new Notification(message);

			instance.onclick = function () {
				// Something to do
			};
			instance.onerror = function () {
				// Something to do
			};
			instance.onshow = function () {
				// Something to do
			};
			instance.onclose = function () {
				// Something to do
			};
		};
		
	    var setSightings = function(username){
		    sightings.getUserSightings(username).
		    	success(function(response){
	    			$scope.sightings = response;
	    	});
		};

		var getUserInfo = function (_username) {
			sightings.getUserInfo(_username)
				.success(function (response) {
					$scope.username = response.username;
					$scope.email = response.email;
					$scope.firstname = response.firstname;
					$scope.lastname = response.lastname;
				})
		};

	    $scope.deleteSighting = function(sighting){
		    sightings.deleteUserSighting(sighting).
		    	success(function() {
					showNotification("Sighting was successfully deleted");
	    	});
			setSightings($scope.user);
	    };

	    $scope.getSighting = function(sighting){
			$scope.sighting = sighting;
	    };

	    $scope.editSighting = function(sighting){
		    sightings.editUserSighting(sighting).
		    	success(function() {
					showNotification("Sighting was successfully edited");
	    	});
			setSightings($scope.user);
	    };

		setSightings($scope.user);
		getUserInfo($scope.user)
}]);
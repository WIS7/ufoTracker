// Controller for the Profile page
ufoApp.controller('profileCtrl', ['$scope', '$stateParams', 'auth', 'sightings',
	function ($scope, $stateParams, auth, sightings) {
		$scope.sighting = {};
		$scope.userProfile ={};
		$scope.readOnly = false;

		// Check if someone is visiting a profile or just opening his own
		if ($stateParams._username === '') {
			// No username provided so just opening his own
			$scope.userProfile.username = auth.currentUser()
		}
		else {
			// Username provided, check if it is the current user
			if ($stateParams._username !== auth.currentUser()) {
				// Logged in user is viewing another profile, no editing possible
				$scope.readOnly = true;
			}
			$scope.userProfile.username = $stateParams._username
		}

		// ** Notification setup **
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

		// Ensure the sightings for the requested user are loaded
	    var setSightings = function(username){
		    sightings.getUserSightings(username).
		    	success(function(response){
    			for(var i=0;i<response.length;i++){
			        var obj = response[i];
					if (obj.url === undefined) {
						obj.url = "images/default.png";
					}
			    }
	    			$scope.sightings = response;
	    	});
		};

		// Ensure the user info for the requested user is loaded
		var getUserInfo = function (username) {
			sightings.getUserInfo(username)
				.success(function (profile) {
					$scope.userProfile = profile;
				})
		};

		// Handle editing of user profile
		$scope.editUserProfile = function (userProfile){
			   sightings.editUserInfo(userProfile).
		    	success(function() {
					showNotification("User profile was successfully edited");
	    	});
			getUserInfo($scope.userProfile.username);
	    };

			// Handle deleting of a specific sighting
	    $scope.deleteSighting = function(sighting){
		    sightings.deleteUserSighting(sighting).
		    	success(function() {
					showNotification("Sighting was successfully deleted");
					setSightings($scope.userProfile.username);
	    	});
	    };

	    $scope.getSighting = function(sighting){
			$scope.sighting = sighting;
	    };

			// Handle editing of a specific sighting
	    $scope.editSighting = function(sighting){
		    sightings.editUserSighting(sighting).
		    	success(function() {
					showNotification("Sighting was successfully edited");
	    	});
			setSightings($scope.userProfile.username);
	    };

		setSightings($scope.userProfile.username);
		getUserInfo($scope.userProfile.username);
}]);

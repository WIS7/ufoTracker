ufoApp.controller('profileCtrl', ['$scope','auth', 'sightings',
	function($scope, auth, sightings){
		$scope.currentUser = auth.currentUser;
		$scope.sighting = {};
		
		var username = auth.currentUser();

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

	    $scope.deleteSighting = function(sighting){
		    sightings.deleteUserSighting(sighting).
		    	success(function() {
					showNotification("Sighting was successfully deleted");
	    	});
		    setSightings(username);
	    };

	    $scope.getSighting = function(sighting){
			$scope.sighting = sighting;
	    };

	    $scope.editSighting = function(sighting){
		    sightings.editUserSighting(sighting).
		    	success(function() {
					showNotification("Sighting was successfully edited");
	    	});
		    setSightings(username);
	    };

	    setSightings(username);
}]);
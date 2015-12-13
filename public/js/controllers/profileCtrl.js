ufoApp.controller('profileCtrl', ['$scope','auth', 'sightings',
	function($scope, auth, sightings){
		$scope.currentUser = auth.currentUser;
		$scope.sighting = {};
		
		var username = auth.currentUser();
		
	    var setSightings = function(username){
		    sightings.getUserSightings(username).
		    	success(function(response){
	    			$scope.sightings = response;
	    	});
	    };		

	    $scope.deleteSighting = function(sighting){
		    sightings.deleteUserSighting(sighting).
		    	success(function(){
	    			//alert("Sighting deleted");
	    	});
		    setSightings(username);
	    };

	    $scope.getSighting = function(sighting){
			$scope.sighting = sighting;
	    };

	    $scope.editSighting = function(sighting){
		    sightings.editUserSighting(sighting).
		    	success(function(){
	    			//alert("Sighting edited");
	    	});
		    setSightings(username);
	    };

	    setSightings(username);
}]);
ufoApp.controller('profileCtrl', ['$scope','auth', 'sightings',
	function($scope, auth, sightings){
		$scope.currentUser = auth.currentUser;
		var username = auth.currentUser();
		
	    var setSightings = function(username){
		    sightings.getUserSightings(username).
		    	success(function(response){
	    			$scope.sightings = response;
	    	});
	    };		

	    $scope.deleteSighting = function(sightingID){
		    sightings.deleteUserSighting(sightingID).
		    	success(function(){
	    			alert("Sighting deleted");
	    	});
		    setSightings(username);
	    };

	    setSightings(username);
}]);
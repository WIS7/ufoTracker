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

	    var deleteSighting = function(sightingID){
		    sightings.deleteSighting(sightingID).
		    	success(function(){
	    			alert("Sighting deleted");
	    	});
	    };
	    setSightings(username);
}]);
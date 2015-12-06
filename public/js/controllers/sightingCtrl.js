ufoApp.controller('sightingCtrl',
	['$scope', '$stateParams', 'sightings', 
	function($scope,$stateParams, sightings){
		var ID = $stateParams._sightingID;
		$scope.ID = ID;
	    var setSighting = function(){
		    sightings.getOneSighting(ID).
		    	success(function(response){
	    			$scope.sighting = response;
	    	});
	    }
	    var setComments = function(){
		    sightings.getComments(ID).
		    	success(function(response){
	    			$scope.comments = response;
	    	});
	    }
	    setSighting();
	    setComments();
	}
	// id: 2866ad00a8356af
	// secret: 43b2c8e3004865bb36639eea701a03cb65c5a88a
]);
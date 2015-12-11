ufoApp.controller('sightingCtrl',
	['$scope', '$stateParams', 'sightings', 'auth',
	function($scope,$stateParams, sightings, auth){
		var ID = $stateParams._sightingID;
		$scope.ID = ID;
		$scope.isLoggedIn = auth.isLoggedIn;
	    var setSighting = function(){
		    sightings.getOneSighting(ID).
		    	success(function(response){
	    			$scope.sighting = response;
	    	});
	    };
	    var setComments = function(){
		    sightings.getComments(ID).
		    	success(function(response){
	    			$scope.comments = response;
	    	});
	    };

		$scope.writeComment = function(){
			var sightingID = ID;
			var content = $scope.comment;
			if(!content || content === '') 
			{return;}
			var dataObj = {
			  	content: content,
			  	author: auth.currentUser(),
			  	_sightingID: sightingID
			};
			sightings.postComment(dataObj).success(function(){
				//alert("New Comment added successfully");
			});
			$scope.comment = '';
			setComments();
		};

	    setSighting();
	    setComments();
	}
]);
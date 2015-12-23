// Controller for the Sighting page
ufoApp.controller('sightingCtrl',
	['$scope', '$stateParams', 'sightings', 'auth',
	function($scope,$stateParams, sightings, auth){
		var ID = $stateParams._sightingID;
		$scope.ID = ID;
		$scope.isLoggedIn = auth.isLoggedIn;

			// Ensure sighting is loaded
	    var setSighting = function(){
		    sightings.getOneSighting(ID).
		    	success(function(response){
	    			$scope.sighting = response;
				if ($scope.sighting.url === undefined) {
					$scope.sighting.url = "images/default.png";
				}
	    	});
	    };
			// Ensure comments are loaded
	    var setComments = function(){
		    sightings.getComments(ID).
		    	success(function(response){
	    			$scope.comments = response;
	    	});
	    };

			// Save a comment
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

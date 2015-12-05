ufoApp.controller('sightingsCtrl',['$scope', '$state', 'sightings','auth',  
	function($scope,$state,sightings,auth){
		$scope.titlePage = "Post a new Sighting!";
	    $scope.isLoggedIn = auth.isLoggedIn;
		// Small function to toggle a button
		$scope.bool = false;
		$scope.hideShow = function() {
			$scope.bool = !($scope.bool);
		}

	    var setSightings = function(){
		    sightings.getSightings().
		    	success(function(response){
	    			$scope.sightings = response;
	    	});
	    }

	    setSightings();

		$scope.addSighting = function(){
			if(!$scope.title || $scope.title === '' || 
				!$scope.description || $scope.description === '') 
			{ 	
				return;
			}
			var dataObj = {
			  	title: $scope.title,
			  	description: $scope.description,
			  	author: auth.currentUser()
			};

			sightings.postSighting(dataObj);
 
			setSightings();  

			$scope.title = '';
			$scope.description = '';
		};

		$scope.viewSighting = function(sightingID){
			$state.go('sighting', {_sightingID: sightingID});
		}
	}
]);
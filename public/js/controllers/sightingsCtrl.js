ufoApp.controller('sightingsCtrl',['$scope', '$state', 'sightings','auth',  
	function($scope,$state,sightings,auth){
		// Small function to toggle a button
		$scope.bool = false;
		$scope.hideShow = function() {
			$scope.bool = !($scope.bool);
		}

	    $scope.titlePage = "Post a new Sighting!";
	    $scope.isLoggedIn = auth.isLoggedIn;

	    
	    sightings.getSightings().
	    	success(function(response){
    			$scope.sightings = response;
    	});

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

			sightings.postSighting(dataObj).
				success(function(){
					//scope.sightings.push(dataObj);
			});
 
			sightings.getSightings().
			    success(function(response){
		    		$scope.sightings = response;
		    });  

			$scope.title = '';
			$scope.description = '';
		};

		$scope.viewSighting = function(sightingID){
			$state.go('sighting', {id: sightingID});
		}
	}
]);
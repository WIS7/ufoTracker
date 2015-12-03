ufoApp.controller('sightingsCtrl',['$scope','sightings','auth',  
	function($scope,sightings,auth){
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
				!$scope.description || $scope.description === '' || 
				!$scope.author || $scope.author === '') 
			{ 	
				return;
			}
			var dataObj = {
			  	title: $scope.title,
			  	description: $scope.description,
			  	author: $scope.author
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
			$scope.author = '';
		};
	}
]);
ufoApp.controller('sightingsCtrl',['$scope','sightings','auth',  
	function($scope,sightings,auth){
		// Small function to toggle a button
		$scope.bool = false;
		$scope.hideShow = function() {
			$scope.bool = !($scope.bool);
		}

	    $scope.titlePage = "Post a new Sighting!";
	    $scope.isLoggedIn = auth.isLoggedIn;

	    sightings.getSightings($scope);

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
			sightings.postSighting($scope, dataObj);

			$scope.title = '';
			$scope.description = '';
			$scope.author = '';
		};
	}
]);
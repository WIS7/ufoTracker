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
				coordinate: {
					longitude: $scope.longitude,
					latitude: $scope.latitude
				},
			  	author: auth.currentUser()
			};
			console.log(dataObj);

			sightings.postSighting(dataObj).
				success(function(){
					alert("New Sighting added successfully");
			});
 
			setSightings();  

			$scope.title = '';
			$scope.description = '';
		};

		$scope.previewLocation = function() {
			var options =
			{
				zoom: 12,
				center: new google.maps.LatLng(0, 0),
				mapTypeId: google.maps.MapTypeId.ROADMAP
			};
			var map = new google.maps.Map(document.getElementById("map_canvas"), options);
			var mapsAddress = $scope.address;
			var geocoderRequest = {
				address: mapsAddress
			};
			var geocoder = new google.maps.Geocoder();
			geocoder.geocode(geocoderRequest, function(results, status){
				if (status == google.maps.GeocoderStatus.OK) {

					$scope.longitude = results[0].geometry.location.lng();
					$scope.latitude = results[0].geometry.location.lat();
					$scope.address = results[0].formatted_address;
					var marker = new google.maps.Marker({
						position: {lat: $scope.latitude, lng: $scope.longitude},
						map: map
					});
					$scope.$digest();
					var currentLocation = new google.maps.LatLng($scope.latitude, $scope.longitude);
					map.panTo(currentLocation);

				}
				else {
					console.log(status);
				}
			});
		};

		$scope.viewSighting = function(sightingID){
			$state.go('sighting', {_sightingID: sightingID});
		}
	}
]);
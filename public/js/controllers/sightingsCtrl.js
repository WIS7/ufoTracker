ufoApp.controller('sightingsCtrl',['$scope', '$state', '$timeout', 'sightings','auth', 'imgurUpload',
	function($scope,$state,$timeout,sightings,auth,imgurUpload){
		$scope.main = {};
		$scope.mapsBoolean = true;
		$scope.titlePage = "Post a new Sighting!";
	    $scope.isLoggedIn = auth.isLoggedIn;
		$scope.main.content = "";

	    var setSightings = function(){
		    sightings.getSightings().
		    	success(function(response){
	    			$scope.sightings = response;
	    	});
	    };

		$scope.addSighting = function(){
			if(!$scope.title || $scope.title === '' || 
				!$scope.description || $scope.description === '' ||
				!$scope.date || $scope.date === '') 
			{ 	
				return;
			}
			var dataObj = {
			  	title: $scope.title,
			  	description: $scope.description,
			  	date: $scope.date,
				url: $scope.url,
				coordinate: {
					longitude: $scope.longitude,
					latitude: $scope.latitude
				},
			  	author: auth.currentUser()
			};

			sightings.postSighting(dataObj).success(function(){
				alert("New Sighting added successfully");
			});
 
			setSightings();  

			$scope.title = '';
			$scope.description = '';
			$scope.date ='';
			$scope.longitude = '';
			$scope.latitude ='';
		};

		$scope.uploadProgress = 0;

		$scope.upload = function(element) {
			// What to do when the upload was successful?
			var success = function(result) {
				$scope.sending = false;
				$scope.result = result;
				$scope.url = result.data.link
			};
			// What to do when the upload was a failure?
			var error = function(error) {
				$scope.sending = false;
				$scope.error = error
			};
			// What to do while uploading?
			var notify = function(progress) {
				$timeout(function() {
					$scope.progress = progress
				})
			};
			// Initialise $scope variables
			$scope.sending = true;
			$scope.error = false;

			// Initialise other variables
			var image = element.files[0];
			var clientID = '09da5770eeb1e29';

			imgurUpload.setClientId(clientID);
			imgurUpload
					.upload(image)
					.then(success, error, notify)

		};

		$scope.getMyLocation = function() {
			function showPosition(position) {
				$scope.latitude = position.coords.latitude;
				$scope.longitude = position.coords.longitude;
				$scope.$digest();
			}
			if (navigator.geolocation) {
				navigator.geolocation.getCurrentPosition(showPosition);
			} else {
				console.log("Error");
			}

		};

		$scope.hideMap = function() {
			$scope.mapsBoolean = true;
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
			$scope.mapsBoolean = false;
		};

		$scope.viewSighting = function(sightingID){
			$state.go('sighting', {_sightingID: sightingID});
		};
		setSightings();
	}
]);
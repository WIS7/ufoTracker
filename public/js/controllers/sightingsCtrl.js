ufoApp.controller('sightingsCtrl',['$scope', '$state', 'sightings','auth', 'imgur',
	function($scope,$state,sightings,auth, imgur){
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
				!$scope.description || $scope.description === '') 
			{ 	
				return;
			}
			var dataObj = {
			  	title: $scope.title,
			  	description: $scope.description,
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
			$scope.longitude = '';
			$scope.latitude ='';
		};

		$scope.files = [];
		$scope.imageBase64 = '';

		$scope.uploadImage = function() {
			if ($scope.imageBase64 === '') {
				return
			}
			var imgurStuff = new imgur('09da5770eeb1e29');

			myParams = {
				image: $scope.imageBase64
			};
			imgurStuff.uploadImage(myParams).then(function(result) {
				$scope.url = result.data.link;
				console.log(result.data.link)
			}, function(error) {
				console.error(error);
			});
		};

		$scope.onLoad = function (e, reader, file, fileList, fileObjects, fileObj) {
			console.log(fileObj);
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


		$scope.writeComment = function(sighting){
			var sightingID = sighting._sightingID;
			var content = sighting.comment;
			if(!content || content === '') 
			{return;}
			var dataObj = {
			  	content: content,
			  	author: auth.currentUser(),
			  	_sightingID: sightingID
			};
			sightings.postComment(dataObj).success(function(){
				alert("New Comment added successfully");
			});
			sighting.comment = '';
		};

		setSightings();
	}
]);
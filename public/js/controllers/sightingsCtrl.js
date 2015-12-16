ufoApp.controller('sightingsCtrl',['$scope', '$state', '$timeout', 'sightings','auth', 'imgurUpload',
	function($scope,$state,$timeout,sightings,auth,imgurUpload){
		$scope.main = {};
		$scope.mapsBoolean = true;
		$scope.titlePage = "Post a new Sighting!";
	    $scope.isLoggedIn = auth.isLoggedIn;
		$scope.main.content = "";
		$('#myModal').validator();

	    var setSightings = function(){
		    sightings.getSightings().
		    	success(function(response){
    			for(var i=0;i<response.length;i++){
			        var obj = response[i];
					if (obj.url === undefined) {
						obj.url = "images/default.png";
					}
			    }
	    			$scope.sightings = response;
	    	});
	    };

        var Notification = window.Notification || window.mozNotification || window.webkitNotification;

        // Need to ask the user for permission to show notifications
        Notification.requestPermission(function (permission) {
            // console.log(permission);
        });

        // Function that shows the notification
        var showNotification = function() {
            var instance = new Notification("Sighting was added successfully!");

            instance.onclick = function () {
                // Something to do
            };
            instance.onerror = function () {
                // Something to do
            };
            instance.onshow = function () {
                // Something to do
            };
            instance.onclose = function () {
                // Something to do
            };
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
			  	day: $scope.day,
			  	month:$scope.month,
			  	year: $scope.year,
				url: $scope.url,
				coordinate: {
					longitude: $scope.longitude,
					latitude: $scope.latitude
				},
			  	author: auth.currentUser()
			};

			sightings.postSighting(dataObj).success(function(){
				//alert("New Sighting added successfully");
			});
            showNotification();
 
			setSightings();  

			$scope.title = '';
			$scope.description = '';
			$scope.day = "";
			$scope.month = "";
			$scope.year = "";
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
        
        $scope.viewUser = function (username) {
                console.log(username);
                $state.go('profile', {
                    _username: username
                })
        };

		setSightings();
	}
]);
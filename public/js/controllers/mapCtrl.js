// Controller that handles the map on the detailed sighting page
ufoApp.controller('mapCtrl',
    ['$scope', '$stateParams', 'sightings',
        function($scope, $stateParams, sightings) {
            var ID = $stateParams._sightingID;
            var setSighting = function() {
                sightings.getOneSighting(ID).
                success(function(response) {
                    // Initialise Google Map
                    $scope.sighting = response;
                    var latlng = new google.maps.LatLng($scope.sighting.coordinate.latitude, $scope.sighting.coordinate.longitude);
                    var myOptions = {
                        zoom: 12,
                        center: latlng,
                        mapTypeId: google.maps.MapTypeId.ROADMAP
                    };
                    $scope.map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
                    // Put a marker on the sighting location
                    var marker = new google.maps.Marker({
                        position: {lat: $scope.sighting.coordinate.latitude, lng: $scope.sighting.coordinate.longitude},
                        map: $scope.map
                    });
                    // Show a small info window if the marker is clicked
                    var infowindow = new google.maps.InfoWindow({
                        content: '<p>Sighting Location: ' + marker.getPosition() + '</p>'
                    });
                    google.maps.event.addListener(marker, 'click', function() {
                        infowindow.open($scope.map, marker);
                    });

                    // Make sure map remains centered when resizing the window
                    google.maps.event.addDomListener(window, "resize", function() {
                        var center = $scope.map.getCenter();
                        google.maps.event.trigger($scope.map, "resize");
                        $scope.map.setCenter(center);
                    });
                });
            };
            setSighting();

        }]);

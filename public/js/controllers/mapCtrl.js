ufoApp.controller('mapCtrl',
    ['$scope', '$stateParams', 'sightings',
        function($scope, $stateParams, sightings) {
            var ID = $stateParams._sightingID;
            var setSighting = function(){
                sightings.getOneSighting(ID).
                success(function(response){
                    $scope.sighting = response;
                    var latlng = new google.maps.LatLng($scope.sighting.coordinate.latitude, $scope.sighting.coordinate.longitude);
                    var myOptions = {
                        zoom: 12,
                        center: latlng,
                        mapTypeId: google.maps.MapTypeId.ROADMAP
                    };
                    $scope.map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
                    var marker = new google.maps.Marker({
                        position: {lat: $scope.sighting.coordinate.latitude, lng: $scope.sighting.coordinate.longitude},
                        map: $scope.map
                    });
                    var infowindow = new google.maps.InfoWindow({
                        content: '<p>Sighting Location: ' + marker.getPosition() + '</p>'
                    });

                    // User can click on a marker to get a detailed location
                    google.maps.event.addListener(marker, 'click', function() {
                        infowindow.open($scope.map, marker);
                    });

                    // Resize stuff...
                    google.maps.event.addDomListener(window, "resize", function() {
                        var center = map.getCenter();
                        google.maps.event.trigger(map, "resize");
                        map.setCenter(center);
                    });
                });
            };
            setSighting();

        }]);
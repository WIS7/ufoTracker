/**
 * Created by Jannick on 3/12/15.
 */

ufoApp.controller('mapCtrl',
    ['$scope',
        function($scope) {
            var latlng = new google.maps.LatLng($scope.sighting.location_latitude, $scope.sighting.location_longitude);
            var myOptions = {
                zoom: 12,
                center: latlng,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };
            $scope.map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
            var marker = new google.maps.Marker({
                position: {lat: $scope.sighting.location_latitude, lng: $scope.sighting.location_longitude},
                map: $scope.map
            });
            var infowindow = new google.maps.InfoWindow({
                content: '<p>Marker Location: ' + marker.getPosition() + '</p>'
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

        }])
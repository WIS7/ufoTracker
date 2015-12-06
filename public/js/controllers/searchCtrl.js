ufoApp.controller('searchCtrl',
    ['$scope', '$state', 'sightings',
        function($scope, $state, sightings) {

            var setSightings = function(){
                sightings.getSightings().
                success(function(response){
                    $scope.sightings = response;
                });
            };

            $scope.viewSighting = function(sightingID){
                $state.go('sighting', {_sightingID: sightingID});
            };

            setSightings();
        }
    ]
);
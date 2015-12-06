/**
 * Created by Jannick on 3/12/15.
 */

ufoApp.controller('searchCtrl',
    ['$scope', 'sightings',
        function($scope, sightings) {
            //$scope.sightings = sightings.getSightings();
            var setSightings = function(){
                sightings.getSightings().
                success(function(response){
                    $scope.sightings = response;
                });
            };

            $scope.viewSighting = function(sightingID){
                $state.go('sighting', {_sightingID: sightingID});
            }

            setSightings();
        }
    ]
);
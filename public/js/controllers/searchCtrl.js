// Controller for the Search page
ufoApp.controller('searchCtrl',
    ['$scope', '$stateParams', '$state', 'sightings',
        function ($scope, $stateParams, $state, sightings) {

            $scope.param = $stateParams._searchParam.toUpperCase();

            // Filter for the sightings
            var filterSightings = function (sighting) {
                if (sighting.title.toUpperCase().includes($scope.param)) {
                    return true
                }
                else if (sighting.description.toUpperCase().includes($scope.param)) {
                    return true
                }
                else if (sighting.author.toUpperCase().includes($scope.param)) {
                    return true
                }
                else {
                    return false
                }
            };

            var setSightings = function(){
                sightings.getSightings().
                success(function(response){
                    for(var i=0;i<response.length;i++){
                        var obj = response[i];
                        if (obj.url === undefined) {
                            obj.url = "images/default.png";
                        }
                    }
                    $scope.sightings = response.filter(filterSightings);
                });
            };

            // Visit the detailed page of a specific sighting
            $scope.viewSighting = function(sightingID){
                $state.go('sighting', {
                  _sightingID: sightingID
                });
            };

            // Visit the profile of a specific user
            $scope.viewUser = function (username) {
                $state.go('profile', {
                    _username: username
                })
            };

            setSightings();
        }
    ]
);

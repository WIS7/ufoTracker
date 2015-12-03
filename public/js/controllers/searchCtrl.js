/**
 * Created by Jannick on 3/12/15.
 */

ufoApp.controller('searchCtrl',
    ['$scope', 'sightings',
        function($scope, sightings) {
            sightings.getSightings($scope);
        }
    ]
);
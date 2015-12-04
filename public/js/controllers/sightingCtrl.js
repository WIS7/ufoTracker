ufoApp.controller('sightingCtrl',
	['$scope', '$stateParams', 
	function($scope,$stateParams){
		var ID = $stateParams.id;
		$scope.ID = ID;
	}
]);
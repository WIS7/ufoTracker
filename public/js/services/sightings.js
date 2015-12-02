// factory are responsible to fetch the data or 
// post it. Return an object containing usefull
// "functions"
ufoApp.factory('sightings', ['$http', 'auth', function($http, auth){
	var obj = {};

	obj.getSightings = function(scope){
		return $http.get('/sightings').
			success(function(response){
    			scope.sightings = response;
    		});
	};

	obj.postSighting = function(scope, dataObj){
		return $http.post('/sightings', dataObj,{
   		headers: {Authorization: 'Bearer '+ auth.getToken()}
   		}).success(function(){
			console.log("post req success");
			scope.sightings.push(dataObj);
		});
	};

	return obj;
}]);
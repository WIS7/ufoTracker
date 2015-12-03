// factory are responsible to fetch the data or 
// post it. Return an object containing usefull
// "functions"
ufoApp.factory('sightings', ['$http', 'auth', function($http, auth){
	var obj = {};

	obj.getSightings = function(){
		return $http.get('/sightings');
	};

	obj.postSighting = function(dataObj){
		return $http.post('/sightings', dataObj,
			{headers: {Authorization: 
				'Bearer '+ auth.getToken()
				}
   			}
   		);
	};

	return obj;
}]);